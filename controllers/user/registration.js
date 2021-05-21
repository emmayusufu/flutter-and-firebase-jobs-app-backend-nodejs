const { UserModal } = require("../../models");
const bcrypt = require("bcrypt");
const Helpers = require("../../utilities/helpers");
const { sms } = require("../../config/africas_talking");

exports.registration = (req,res,next) => {
  const { email, phoneNumber, password } = req.body;
  UserModal.findOne(
    {
      phoneNumber: phoneNumber,
    },
    function (err, user) {
      if (err) {
        throw new Error(err)
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
                otp: Helpers.generateOtp(5),
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
                      next(new Error(error))
                    });
                })
                .catch((e) => {
                  next(new Error(e))
                });
            });
          });
        }
      }
    }
  );
};
