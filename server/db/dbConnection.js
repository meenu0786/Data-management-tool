const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/user-data")
  .then(() => {
    console.log("db Connection successfull");
  })
  .catch(() => {
    console.log("db Connection failed");
  });
