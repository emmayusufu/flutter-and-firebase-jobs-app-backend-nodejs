const path = require("path");
//   ====================================================third party packages
const bcrypt = require("bcrypt");
const { OgenzoWidgets } = require("ogenzo-widgets");
//   ==================================================== imports
const UserModal = require("../../modals/user");
const { generateOtp } = require("../../utilities/helper-functions");

// =========================================== ogenzo widgets
const ogenzoWidgets = new OgenzoWidgets({
  smsConfig: {
    username: "EXCHANGER",
    apiKey: "940e53fc7990c0e47d3cd0ef4d3f56f3b8e85b5129e8bb285e46d0d13811529e",
  },
});

const sms = ogenzoWidgets.sms;

// ============================================ cloudinary
const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri/parser");
const User = require("../../modals/user");

cloudinary.config({
  cloud_name: "workman",
  api_key: "514111897351468",
  api_secret: "H35ClJYKIlPzPSIFKwzi1FEfs60",
});

//  ====================================== controller for handling uer login
exports.login = (req, res) => {
  const { contact, password } = req.body;

  UserModal.findOne({ where: { contact: contact } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            if (user.account_valid) {
              res.json({
                message: "success",
                id: user.id,
                firstName: user.first_name,
                lastName: user.lastName,
                contact: user.contact,
                email: user.email,
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

// ==================================================== registering account
exports.register = (req, res) => {
  const { email, contact, password } = req.body;

  UserModal.findOne({
    where: {
      contact: contact,
    },
  })
    .then((user) => {
      if (user) {
        res.json({ message: "contact_already_number_exists" });
      } else if (!user) {
        bcrypt.genSalt(12, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            UserModal.create({
              email,
              contact,
              password: hash,
              otp: generateOtp(5),
            })
              .then((result) => {
                res.json({
                  message: "success",
                  contact: result.contact,
                });
                return result;
              })
              .then((result2) => {
                const number = "0" + result2.contact.substring(4);
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
    })
    .catch((e) => {
      console.log(`caught error ${e}`);
    });
};

// ==================================================== verifying otp
exports.verifyOtp = (req, res) => {
  const { otp, contact } = req.body;

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

// ==================================================== setting up client profile
exports.setupClientProfile = (req, res) => {
  const { id, firstName, lastName } = req.body;

  const dUri = new Datauri();
  const dataUri = dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
  const image = dataUri.content;

  UserModal.findOne({ where: { id: id } })
    .then((user) => {
      if (user) {
        cloudinary.uploader.upload(image, function (error, result) {
          (user.firstName = firstName),
            (user.lastName = lastName),
            (user.dpImage = result.url);
          user.workman = false;
          user.client = true;
          user
            .save()
            .then(() => {
              res.json({ message: "success" });
            })
            .catch((e) =>
              console.log(`caught error ${e} while saving image to cloud`)
            );
        });
      } else {
        res.json({ message: "user_not_found" });
      }
    })
    .catch((e) => {
      console.log(`caught error ${e} user with id : ${id}`);
    });
};

// ==================================================== setting up mechanic profile
exports.setupWorkManProfile = (req, res) => {
  const {
    id,
    profession,
    qualification,
    extraSkills,
    dob,
    firstName,
    lastName,
    areaOfOperation,
    nin,
    userId,
    client,
    workman,
  } = req.body;

  console.log(req.body);
  //   console.log(req.files);
};

exports.users = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => console.log(`caught error ${e} while getting all users`));
};
