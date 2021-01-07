// const { UserModal } = require("../../modals");

const { auth } = require("../../utilities/firebase/admin_config");

exports.verifyOTP = ({ otp, phoneNumber, res }) => {
  auth
    .getUserByPhoneNumber(phoneNumber)
    .then((userRecord) => {
      if (userRecord.toJSON().uid.slice(-5).toUpperCase() === otp) {
        auth
          .updateUser(userRecord.toJSON().uid, {
            disabled: false,
          })
          .then(() => {
            res.json({ message: "success" });
          })
          .catch((error) => {
            console.log("Error updating user:", error);
          });
      } else {
        res.json({ message: "wrong_otp" });
      }
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });

  // UserModal.findOne({ where: { contact: contact } })
  //   .then((user) => {
  //     if (user) {
  //       if (otp == user.otp) {
  //         user.account_valid = true;
  //         user.save();
  //         res.json({
  //           message: "success",
  //           id: user.id,
  //         });
  //       } else {
  //         res.json({ message: "wrong_otp" });
  //       }
  //     } else if (!user) {
  //       res.json({ message: "contact_does_not_exist" });
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(`caught error ${e}`);
  //   });
};
