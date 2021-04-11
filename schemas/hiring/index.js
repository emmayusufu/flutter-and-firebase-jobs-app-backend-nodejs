const mongoose = require("mongoose");

const HiringSchema = new mongoose.Schema({
  clientId: String,
  workManId: String,
  clientName: String,
  clientImage: String,
  clientLocation: String,
  clientContact: String,
  description: String,
  completed: {
    type: Boolean,
  },
  review: String,
  workManRating: {
    type: Number,
    default: 0,
  },
  accepted: {
    type: Boolean,
  },
  declined: {
    type: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hiring", HiringSchema);
