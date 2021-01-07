const { sms } = require("../../utilities/sms");
const { auth } = require("../../utilities/firebase/admin_config");

exports.register = ({ email, phoneNumber, password, res }) => {
  auth
    .createUser({
      email,
      emailVerified: true,
      phoneNumber,
      password,
      disabled: true,
    })
    .then((user) => {
      const number = "0" + user.phoneNumber.substring(4);
      sms
        .sendSMS(
          number,
          `Enter : ${user.uid
            .slice(-5)
            .toUpperCase()} to verify your WorkManNow Account`
        )
        .then(() => {
          res.json(user);
        })
        .catch((e) => {
          console.log(`caught error ${e} while sending sms`);
        });
    })
    .catch((error) => {
      res.json(error.message);
    });
};

// exports.register = ({ email, contact, password, res }) => {
//   UserModal.findOne({
//     where: {
//       contact: contact,
//     },
//   })
//     .then((user) => {
//       if (user) {
//         res.json({ message: "contact_already_number_exists" });
//       } else if (!user) {
//         bcrypt.genSalt(12, function (err, salt) {
//           bcrypt.hash(password, salt, function (err, hash) {
//             UserModal.create({
//               email,
//               contact,
//               password: hash,
//               otp: generateOtp(5),
//             })
//               .then((result) => {
//                 res.json({
//                   message: "success",
//                   contact: result.contact,
//                 });
//                 return result;
//               })
//               .then((result2) => {
//                 const number = "0" + result2.contact.substring(4);
//                 sms
//                   .sendSMS(
//                     number,
//                     `Enter : ${result2.otp} to verify your WorkManNow Account`
//                   )
//                   .catch((e) => {
//                     console.log(`caught error ${e} while sending sms`);
//                   });
//               })
//               .catch((e) => {
//                 console.log(`caught error:${e} while creating user account`);
//               });
//           });
//         });
//       }
//     })
//     .catch((e) => {
//       console.log(`caught error ${e}`);
//     });
// };
