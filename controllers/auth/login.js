const UserModal = require("../../modals/user");

exports.login = ({ res, contact, password }) => {
  UserModal.findOne({ where: { contact: contact } })
    .then((user) => {
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
        res.json({ message: "contact_not_registered" });
      }
    })
    .catch((e) => {
      console.log(`caught error ${e}`);
    });
};
