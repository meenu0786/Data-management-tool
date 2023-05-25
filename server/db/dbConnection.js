const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-data")
  .then(() => {
    console.log("db Connection successfull");
  })
  .catch(() => {
    console.log("db Connection failed");
  });
