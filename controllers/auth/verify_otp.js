// const { UserModal } = require("../../modals");

const { auth } = require("../../utilities/firebase/admin_config");

exports.verifyOTP = ({ otp, phoneNumber, res }) => {
  UserModal.findOne({ phoneNumber: phoneNumber }, function (err, user) {
    if (err) {
      console.log(`caught error ${err}`);
    } else if (!err) {
      if (user) {
        if (otp == user.otp) {
          user.account_valid = true;
          user.save();
          res.json({
            message: "success",
            id: user.id,
          });
        } else {
          res.json({ message: "wrong_otp" });
        }
      } else if (!user) {
        res.json({ message: "phoneNumber_does_not_exist" });
      }
    }
  });
};
