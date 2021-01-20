const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneToken: String,
  firstName: String,
  lastName: String,
  qualification: String,
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
  aboutSelf: String,
  specialities: [],
  areaOfOperation: String,
  dob: String,
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
  online: {
    type: Boolean,
  },
  rating: {
    type: Number,
    default: 0,
  },
  startingFee: String,
  userToken: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
