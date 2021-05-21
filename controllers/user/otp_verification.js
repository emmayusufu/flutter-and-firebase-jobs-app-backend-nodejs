const {UserModal} = require("../../models");

exports.otpVerification = (req, res, next) => {
    const {otp, phoneNumber} = req.body;
    UserModal.findOne({phoneNumber: phoneNumber}, function (err, user) {
        if (err) {
            throw new Error(err)
        } else if (!err) {
            if (user) {
                if (otp === user.otp) {
                    user.account_valid = true;
                    user.save().then((verifiedUser) => {
                        res.json({
                            message: "success",
                            user: {_id: verifiedUser._id},
                        })
                    })
                } else {
                    res.json({message: "wrong_otp"});
                }
            } else if (!user) {
                res.json({message: "phone_number_does_not_exist"});
            }
        }
    });
};
