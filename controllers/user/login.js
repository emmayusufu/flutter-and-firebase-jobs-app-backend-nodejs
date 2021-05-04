const { UserModal } = require("../../models");
const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
  const { phoneNumber, password } = req.body;
  UserModal.findOne({ phoneNumber })
    .select("-otp -__v -nin -createdAt -updatedAt -idFrontImage -idBackImage")
    .exec((err, user) => {
      if (err) {
        throw new Error(err)
      } else if (!err) {
        if (user) {
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              if (user.account_valid) {
                res.json({
                  message: "success",
                  user,
                });
              } else res.json({ message: "account_not_valid" });
            } else {
              res.json({ message: "wrong_password" });
            }
          });
        } else if (!user) {
          res.json({ message: "user_not_found" });
        }
      }
    });
};
