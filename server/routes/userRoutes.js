const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/upload-data",
  userController.upload.single("file"),
  userController.uploadCSV
);

module.exports = router;
