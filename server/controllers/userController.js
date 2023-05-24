const multer = require("multer");
const fs = require("fs");
const csvParser = require("csv-parser");
const userModel = require("../models/userModels");

const csvFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: csvFilter,
});

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      status: "failed",
      message: "File does not exist",
    });
  }

  const {
    totalRecordsInserted,

    totalDuplicateRecordInDB,
  } = await uploadAndInsertData(filePath);

  return res.status(200).json({
    status: "Data uploaded",
    totalRecordsInserted,

    totalDuplicateRecordInDB,
  });
};

async function uploadAndInsertData(csvFilePath) {
  let recordsInserted = 0;
  let duplicateRecordInDB = 0;

  const stream = fs.createReadStream(csvFilePath).pipe(csvParser());

  for await (const record of stream) {
    const user = new userModel(record);
    try {
      await user.save();
      recordsInserted++;
    } catch (error) {
      duplicateRecordInDB++;
    }
  }

  fs.unlink(csvFilePath, (err) => {});

  return {
    totalRecordsInserted: recordsInserted,
    totalDuplicateRecordInDB: duplicateRecordInDB,
  };
}

module.exports = {
  upload,
  uploadCSV,
  uploadAndInsertData,
};
