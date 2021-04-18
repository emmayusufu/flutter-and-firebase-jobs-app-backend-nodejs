const { UserModal } = require("../../models");

exports.verifyOTP = ({ otp, phoneNumber, res }) => {
  UserModal.findOne({ phoneNumber: phoneNumber }, function (err, user) {
    if (err) {
      console.log(`caught error ${err}`);
    } else if (!err) {
      if (user) {
        if (otp == user.otp) {
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
        res.json({ message: "phoneNumber_does_not_exist" });
      }
    }
  });
};
