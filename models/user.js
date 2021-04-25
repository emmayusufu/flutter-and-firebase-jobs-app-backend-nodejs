const mongoose = require("mongoose");
const {userRoles} = require("../utilities/constants")

const userSchema = new mongoose.Schema({
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
    specialities: String,
    regionOfOperation: String,
    dob: String,
    nin: String,
    profileImage: String,
    idFrontImage: String,
    idBackImage: String,
    role: {
        type: String,
        enum: [userRoles.client, userRoles.workman],
    },
    online: Boolean,
    rating: Number,
    startingFee: String,
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
