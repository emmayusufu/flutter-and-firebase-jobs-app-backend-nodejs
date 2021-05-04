// noinspection DuplicatedCode

const { UserModal } = require("../../models");
const { userRoles } = require("../../utilities/constants");
const ImageStorage = require("../../utilities/image_storage");

exports.setupWorkManProfile = async (req, res, next) => {
  const {
    userId,
    firstName,
    lastName,
    regionOfOperation,
    dob,
    qualification,
    specialities,
    nin,
    profession,
    aboutSelf,
    startingFee,
  } = req.body;

  const profileImage = req.files.find((e) => e.fieldname === "profileImage");
  const idFrontImage = req.files.find((e) => e.fieldname === "idFrontImage");
  const idBackImage = req.files.find((e) => e.fieldname === "idBackImage");

  const profileImageUploader = new ImageStorage(profileImage);
  const idFrontImageUploader = new ImageStorage(idFrontImage);
  const idBackImageUploader = new ImageStorage(idBackImage);

  UserModal.findOneAndUpdate(
    { _id: userId },
    {
      firstName,
      lastName,
      regionOfOperation,
      dob,
      qualification: qualification.split(","),
      specialities: specialities.split(","),
      nin,
      profession,
      aboutSelf,
      startingFee,
      profileImage: await profileImageUploader.uploadImage(),
      idFrontImage: await idFrontImageUploader.uploadImage(),
      idBackImage: await idBackImageUploader.uploadImage(),
      role: userRoles.workman,
    },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      throw new Error(err)
    } else if (!err) {
      if (user) {
        res.json({
          message: "success",
          user: user,
        });
      } else {
        res.status(417).json({
          message: "account_update_failed",
        });
      }
    }
  });
};
