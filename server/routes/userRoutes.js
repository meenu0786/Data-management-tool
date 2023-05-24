const express = require("express");

const router = express.Router();

router.post("/upload-data", (req, res) => {
  console.log("In router");
});

module.exports = router;
