const { UserModal } = require("../../modals");
const bcrypt = require("bcrypt");

exports.login = ({ res, phoneNumber, password }) => {
  UserModal.findOne({ phoneNumber: phoneNumber }, function (err, user) {
    if (err) {
      console.log(`caught error ${err}`);
    } else if (!err) {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            if (user.account_valid) {
              res.json({
                message: "success",
                user: user,
              });
            } else res.json({ message: "account_not_valid" });
          } else {
            res.json({ message: "wrong_password" });
          }
        });
      } else if (!user) {
        res.json({ message: "phoneNumber_not_registered" });
      }
    }
  });
};
