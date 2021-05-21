const { UserModal } = require("../../models");
const ImageStorage = require("../../utilities/image_storage");
const Helpers = require("../../utilities/helpers");

exports.updateProfile = (req, res, next) => {
  const {
    regionOfOperation,
    qualification,
    specialities,
    profession,
    role,
    aboutSelf,
    startingFee,
    userId,
    nin,
    dob,
  } = req.body;

  const profileImage = req.files.find((e) => e.fieldname === "profileImage");
  const idFrontImage = req.files.find((e) => e.fieldname === "idFrontImage");
  const idBackImage = req.files.find((e) => e.fieldname === "idBackImage");

  const profileImageUploader = new ImageStorage(profileImage);
  const idFrontImageUploader = new ImageStorage(idFrontImage);
  const idBackImageUploader = new ImageStorage(idBackImage);

  UserModal.findById(userId, async function (err, doc) {
    if (profileImage && doc.profileImage) {
      const arr = Object.values(doc.profileImage);
      await Promise.all(arr.map((e) => Helpers.deleteFile(e)));
    }
    if (idFrontImage && doc.idFrontImage) {
      const arr = Object.values(doc.idFrontImage);
      arr.map((e) => Helpers.deleteFile(e));
    }
    if (idBackImage && doc.idBackImage) {
      const arr = Object.values(doc.idBackImage);
      arr.map((e) => Helpers.deleteFile(e));
    }
    if (err) {
      throw new Error(err)
    } else {
      nin ? (doc.nin = nin) : null;
      dob ? (doc.dob = dob) : null;
      regionOfOperation ? (doc.regionOfOperation = regionOfOperation) : null;
      qualification ? (doc.qualification = qualification) : null;
      specialities ? (doc.specialities = specialities) : null;
      aboutSelf ? (doc.aboutSelf = aboutSelf) : null;
      startingFee ? (doc.startingFee = startingFee) : null;
      profession ? (doc.profession = profession) : null;
      role ? (doc.role = role) : null;
      profileImage
        ? (doc.profileImage = await profileImageUploader.uploadImage())
        : null;
      idFrontImage
        ? (doc.idFrontImage = await idFrontImageUploader.uploadImage())
        : null;
      idBackImage
        ? (doc.idBackImage = await idBackImageUploader.uploadImage())
        : null;
      doc
        .save()
        .then((user) => {
          res.json({
            message: "success",
            user
          });
        })
        .catch((err) =>next(err));
    }
  });
};
