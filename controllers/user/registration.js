const { UserModal } = require("../../models");
const { generateOtp } = require("../../utilities/helper_functions");
const bcrypt = require("bcrypt");
const { sms } = require("../../config/africas_talking");

exports.registration = (req,res) => {
  const { email, phoneNumber, password } = req.body;
  UserModal.findOne(
    {
      phoneNumber: phoneNumber,
    },
    function (err, user) {
      if (err) {
        res.status(503).json({err})
      } else if (!err) {
        if (user) {
          res.json({ message: "phone_number_already_number_exists" });
        } else if (!user) {
          bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              new UserModal({
                email,
                phoneNumber,
                password: hash,
                account_valid:false,
                otp: generateOtp(5),
              })
                .save()
                .then((result) => {
                  sms
                    .send({
                      to: [result.phoneNumber],
                      message: `Enter : ${result.otp} to verify your WorkManNow account`,
                    })
                    .then(() => {
                      res.json({
                        message: "success",
                        phoneNumber: result.phoneNumber,
                      });
                    })
                    .catch((error) => {
                      new Error("caught error while sending sms")
                    });
                })
                .catch((e) => {
                  new Error(`caught error while creating user account`);
                });
            });
          });
        }
      }
    }
  );
};
