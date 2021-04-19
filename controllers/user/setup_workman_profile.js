const { UserModal } = require("../../models");
const { userRoles } = require("../../utilities");
const ImageStorage = require("../../utilities/image_storage");

exports.setupWorkManProfile = async (req,res) => {
  const {
    userId,
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

  const profileImage = req.files.find((e) => e.fieldname == "profileImage");
  const idFrontImage = req.files.find((e) => e.fieldname == "idFrontImage");
  const idBackImage = req.files.find((e) => e.fieldname == "idBackImage");


  const profileImageUploader = new ImageStorage(profileImage);
  const idFrontImageUploader = new ImageStorage(idFrontImage);
  const idBackImageUploader = new ImageStorage(idBackImage);

  UserModal.findOneAndUpdate(
    { _id: userId },
    {
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
      profileImage: await profileImageUploader.uploadImage(),
      idFrontImage: await idFrontImageUploader.uploadImage(),
      idBackImage: await idBackImageUploader.uploadImage(),
      role: userRoles.workman,
    },
    { new: true, useFindAndModify: false },
    function (err, user) {
      if (err) console.log(err);
      res.json({
        message: "success",
        user: user,
      });
    }
  );
};
