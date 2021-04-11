const { UserModal } = require("../../schemas");

const { login } = require("./login");
const { verifyOTP } = require("./verify_otp");
const { register } = require("./register");
const { setupClientProfile } = require("./setup_client_profile");
const { setupWorkManProfile } = require("./setup_workman_profile");
// const { getImageUrl } = require("../../utilities/helper-functions");
const user = require("../../schemas/user");
const { updateAccount } = require("./update_account");

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

  setupClientProfile({ firstName, id, image: req.file, lastName, res });
};

// ==================================================== setting up workman profile
exports.setupWorkManProfile = (req, res) => {
  const {
    id,
    firstName,
    lastName,
    areaOfOperation,
    dob,
    qualification,
    specialities,
    nin,
    profession,
    aboutSelf,
    startingFee,
  } = req.body;

  const dpImage = req.files.find((e) => e.fieldname == "dpImage");
  const idBack = req.files.find((e) => e.fieldname == "idBack");
  const idFront = req.files.find((e) => e.fieldname == "idFront");

  setupWorkManProfile({
    id,
    firstName,
    lastName,
    areaOfOperation,
    dob,
    qualification,
    specialities,
    nin,
    profession,
    dpImage,
    idBack,
    idFront,
    aboutSelf,
    startingFee,
    res,
  });
};

// ==================================================== getting all clients
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

// ==================================================== getting all workmen
exports.allWorkmen = (req, res) => {
  const { id } = req.params;
  UserModal.find({ workman: true }, function (err, workmen) {
    if (err) {
      console.log(err);
      res.json({ message: `caught error:${err}` });
    } else if (!err) {
      res.json(
        workmen.filter((e) => {
          return e._id != id;
        })
      );
    }
  });
};

// ==================================================== updating user account
exports.updateAccount = async (req, res) => {
  const { id } = req.params;
  const {
    areaOfOperation,
    qualification,
    specialities,
    profession,
    client,
    workman,
    aboutSelf,
    startingFee,
    nin,
  } = req.body;

  const dpImage = req.files.find((e) => e.fieldname == "dpImage");
  const idBack = req.files.find((e) => e.fieldname == "idBack");
  const idFront = req.files.find((e) => e.fieldname == "idFront");

  updateAccount({
    areaOfOperation,
    id,
    qualification,
    specialities,
    profession,
    client,
    workman,
    aboutSelf,
    startingFee,
    nin,
    idFront,
    idBack,
    dpImage,
    res,
  });
};
