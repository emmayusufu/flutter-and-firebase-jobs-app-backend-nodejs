const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {user_roles} = require("../utilities")

const userSchema = Schema({
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
  account_valid: Boolean,
  profession: String,
  aboutSelf: String,
  specialities:String,
  areaOfOperation: String,
  dob: String,
  nin: String,
  profileImage: String,
  idFront: String,
  idBack: String,
  role:{
    type:String,
    enum:[user_roles.client,user_roles.workman],
  },
  online: Boolean,
  rating:Number,
  startingFee: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
