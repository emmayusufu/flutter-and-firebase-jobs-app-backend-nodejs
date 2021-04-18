const { UserModal } = require("../../models");

exports.otpVerification = (req,res) => {
  const { otp, phoneNumber } = req.body;
  UserModal.findOne({ phoneNumber: phoneNumber }, function (err, user) {
    if (err) {
      res.status(503).json({err})
    } else if (!err) {
      if (user) {
        if (otp === user.otp) {
          UserModal.updateOne(
            { _id: user._id },
            { account_valid: true },
            function (err, user2) {
              res.json({
                message: "success",
                id: user._id,
              });
            }
          );
        } else {
          res.json({ message: "wrong_otp" });
        }
      } else if (!user) {
        res.json({ message: "phone_number_does_not_exist" });
      }
    }
  });
};
