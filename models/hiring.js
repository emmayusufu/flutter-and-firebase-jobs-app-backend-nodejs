const mongoose = require("mongoose");
const {hiringStatus} = require("../utilities/constants")

const HiringSchema = new mongoose.Schema({
    clientId: String,
    workManId: String,
    clientLocation: String,
    description: String,
    hiringStatus:  {
        type: String,
        enum: [hiringStatus.complete, hiringStatus.pending],
    },
    review: String,
    workManRating:Number,
    clientRating:Number,
}, {timestamps: true,});

module.exports = mongoose.model("Hiring", HiringSchema);
