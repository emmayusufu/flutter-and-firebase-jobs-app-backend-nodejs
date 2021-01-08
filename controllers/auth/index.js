const { UserModal } = require("../../modals");

const { login } = require("./login");
const { verifyOTP } = require("./verify_otp");
const { register } = require("./register");
const { setupClientProfile } = require("./setup_client_profile");
const { setupWorkManProfile } = require("./setup_workman_profile");
const { toBase64 } = require("../../utilities/helper-functions");

const { auth, db } = require("../../utilities/firebase/admin_config");

//  ====================================== controller for handling uer login
exports.login = (req, res) => {
  const { phoneNumber, password } = req.body;
  login({ res, phoneNumber, password });
};

// ==================================================== registering account
exports.register = (req, res) => {
  const { email, phoneNumber, password } = req.body;
  register({ phoneNumber, email, password, res });
};

// ==================================================== verifying otp
exports.verifyOtp = (req, res) => {
  const { otp, phoneNumber } = req.body;
  verifyOTP({ otp, phoneNumber, res });
};

// ==================================================== setting up client profile
exports.setupClientProfile = (req, res) => {
  const { id, firstName, lastName } = req.body;
  // const image = toBase64(req.file);

  setupClientProfile({ firstName, id, image: req.file, lastName, res });
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
  UserModal.find({ client: true }, function (err, clients) {
    if (err) {
      console.log(err);
      res.json({ message: `caught error:${err}` });
    } else if (!err) {
      res.json(clients);
    }
  });
};

exports.allWorkmen = (req, res) => {
  UserModal.find({ workman: true }, function (err, workmen) {
    if (err) {
      console.log(err);
      res.json({ message: `caught error:${err}` });
    } else if (!err) {
      res.json(workmen);
    }
  });
};
