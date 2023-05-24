const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
