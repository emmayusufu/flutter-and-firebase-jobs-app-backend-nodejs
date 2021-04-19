const { UserModal } = require("../../models");
const ImageStorage = require("../../utilities/image_storage");

exports.updateAccount = (req, res) => {
  const {
    areaOfOperation,
    qualification,
    specialities,
    profession,
    client,
    workman,
    aboutSelf,
    startingFee,
    userId,
    nin,
  } = req.body;

  const profileImage = req.files.find((e) => e.fieldname == "profileImage");
  const idFrontImage = req.files.find((e) => e.fieldname == "idFrontImage");
  const idBackImage = req.files.find((e) => e.fieldname == "idBackImage");

  const profileImageUploader = new ImageStorage(profileImage);
  const idFrontImageUploader = new ImageStorage(idFrontImage);
  const idBackImageUploader = new ImageStorage(idBackImage);

  UserModal.findById(userId, async function (err, doc) {
    if (err) {
      console.log(`caught error: ${err} while finding user with id:${id}`);
    } else {
      nin ? (doc.nin = nin) : null;
      areaOfOperation ? (doc.areaOfOperation = areaOfOperation) : null;
      qualification ? (doc.qualification = qualification) : null;
      specialities ? (doc.specialities = specialities) : null;
      aboutSelf ? (doc.aboutSelf = aboutSelf) : null;
      startingFee ? (doc.startingFee = startingFee) : null;
      profession ? (doc.profession = profession) : null;
      workman != null ? (doc.workman = JSON.parse(workman)) : null;
      client != null ? (doc.client = JSON.parse(client)) : null;
      // =========================================================================storing images
      profileImage != null
        ? (doc.profileImage = profileImageUploader.uploadImage())
        : null;
      idFront != null
        ? (doc.idFront = await idFrontImageUploader.uploadImage())
        : null;
      idBack != null
        ? (doc.idBack = await idBackImageUploader.uploadImage())
        : null;
      doc
        .save()
        .then((savedDoc) => {
          res.json({
            message: "success",
            user: savedDoc,
          });
        })
        .catch((err) =>
          console.log(`caught error: ${err} while updating user with id:${id}`)
        );
    }
  });
};
