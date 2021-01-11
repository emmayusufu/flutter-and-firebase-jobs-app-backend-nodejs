const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  clientId: String,
  workManId: String,
  description: String,
  completed: Boolean,
  review: String,
  workManRating: String,
  clientRating: String,
});

module.exports = mongoose.model("Job", jobSchema);
