const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: String,
  account_valid: {
    type: Boolean,
    default: false,
  },
  profession: String,
  qualification: String,
  extraSkills: String,
  areaOfOperation: String,
  nin: String,
  dpImage: String,
  idFront: String,
  idBack: String,
  client: {
    type: Boolean,
    default: false,
  },
  workman: {
    type: Boolean,
    default: false,
  },
  rating: String,
  starting_fee: String,
});

module.exports = mongoose.model("User", userSchema);
