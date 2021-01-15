const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  clientId: String,
  workManId: String,
  clientName: String,
  clientPhoneNumber: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  review: String,
  workManRating: {
    type: Number,
    default: 0,
  },
  clientRating: {
    type: Number,
    default: 0,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Job", jobSchema);
