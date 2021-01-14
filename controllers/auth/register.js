const { UserModal } = require("../../modals");
const { generateOtp } = require("../../utilities/helper-functions");
const bcrypt = require("bcrypt");
const { sms } = require("../../utilities/africastalking");

exports.register = ({ email, phoneNumber, password, res }) => {
  UserModal.findOne(
    {
      phoneNumber: phoneNumber,
    },
    function (err, user) {
      if (err) {
        console.log(`caught error ${err}`);
      } else if (!err) {
        if (user) {
          res.json({ message: "phoneNumber_already_number_exists" });
        } else if (!user) {
          bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              new UserModal({
                email,
                phoneNumber,
                password: hash,
                otp: generateOtp(5),
              })
                .save()
                .then((result) => {
                  sms
                    .send({
                      to: [result.phoneNumber],
                      message: `Enter : ${result.otp} to verify your WorkManNow Account`,
                    })
                    .then(() => {
                      res.json({
                        message: "success",
                        phoneNumber: result.phoneNumber,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((e) => {
                  console.log(`caught error:${e} while creating user account`);
                });
            });
          });
        }
      }
    }
  );
};
