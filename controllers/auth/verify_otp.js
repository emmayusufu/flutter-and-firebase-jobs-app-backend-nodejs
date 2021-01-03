const UserModal = require("../../modals/user");

exports.verifyOTP = ({ otp, contact, res }) => {
  UserModal.findOne({ where: { contact: contact } })
    .then((user) => {
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
        res.json({ message: "contact_does_not_exist" });
      }
    })
    .catch((e) => {
      console.log(`caught error ${e}`);
    });
};
