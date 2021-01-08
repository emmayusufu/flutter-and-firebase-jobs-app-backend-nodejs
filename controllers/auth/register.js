const { UserModal } = require("../../modals");
const { generateOtp } = require("../../utilities/helper-functions");
const bcrypt = require("bcrypt");
const { sms } = require("../../utilities/sms");

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
                  res.json({
                    message: "success",
                    phoneNumber: result.phoneNumber,
                  });
                  return result;
                })
                .then((result2) => {
                  const number = "0" + result2.phoneNumber.substring(4);
                  sms
                    .sendSMS(
                      number,
                      `Enter : ${result2.otp} to verify your WorkManNow Account`
                    )
                    .catch((e) => {
                      console.log(`caught error ${e} while sending sms`);
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
