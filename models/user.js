const {Schema, model} = require("mongoose");
const {userRoles} = require("../utilities/constants")

const userSchema = new Schema({
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
    otp: {
        type:String,
    },
    account_valid: Boolean,
    profession: String,
    aboutSelf: String,
    specialities: [String],
    regionOfOperation: String,
    online:true,
    dob: String,
    nin: String,
    profileImage: Schema.Types.Mixed,
    idFrontImage: Schema.Types.Mixed,
    idBackImage: Schema.Types.Mixed,
    role: {
        type: String,
        enum: [userRoles.client, userRoles.workman],
    },
    online: Boolean,
    rating: {
        type:Number,
        default:0
    },
    startingFee: String,
}, {timestamps: true});

module.exports = model("User", userSchema);
