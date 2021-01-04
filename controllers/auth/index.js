const { UserModal } = require("../../modals");

const { login } = require("./login");
const { verifyOTP } = require("./verify_otp");
const { register } = require("./register");
const { setupClientProfile } = require("./setup_client_profile");
const { setupWorkManProfile } = require("./setup_workman_profile");
const { toBase64 } = require("../../utilities/helper-functions");

//  ====================================== controller for handling uer login
exports.login = (req, res) => {
  const { contact, password } = req.body;
  login({ res, contact, password });
};

// ==================================================== registering account
exports.register = (req, res) => {
  const { email, contact, password } = req.body;
  register({ contact, email, password, res });
};

// ==================================================== verifying otp
exports.verifyOtp = (req, res) => {
  const { otp, contact } = req.body;
  verifyOTP({ otp, contact, res });
};

// ==================================================== setting up client profile
exports.setupClientProfile = (req, res) => {
  const { id, firstName, lastName } = req.body;
  const image = toBase64(req.file);

  setupClientProfile({ firstName, id, image, lastName, res });
};

// ==================================================== setting up mechanic profile
exports.setupWorkManProfile = (req, res) => {
  const {
    id,
    firstName,
    lastName,
    areaOfOperation,
    dob,
    qualification,
    extraSkills,
    nin,
    profession,
  } = req.body;

  const dpImage = toBase64(req.files.find((e) => e.fieldname == "dpImage"));
  const idBack = toBase64(req.files.find((e) => e.fieldname == "idBack"));
  const idFront = toBase64(req.files.find((e) => e.fieldname == "idFront"));

  setupWorkManProfile({
    id,
    firstName,
    lastName,
    areaOfOperation,
    dob,
    qualification,
    extraSkills,
    nin,
    profession,
    dpImage,
    idBack,
    idFront,
    res,
  });
};

exports.allClients = (req, res) => {
  UserModal.findAll({ where: { client: true } })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => console.log(`caught error ${e} while getting all users`));
};

exports.allWorkmen = (req, res) => {
  UserModal.findAll({ where: { workman: true } })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => console.log(`caught error ${e} while getting all users`));
};
