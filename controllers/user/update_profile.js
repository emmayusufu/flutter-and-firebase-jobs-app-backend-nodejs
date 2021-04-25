const {UserModal} = require("../../models");
const ImageStorage = require("../../utilities/image_storage");
const {deleteFile} = require("../../utilities/helper_functions");

exports.updateAccount = (req, res) => {
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
    } = req.body;

    const profileImage = req.files.find((e) => e.fieldname === "profileImage");
    const idFrontImage = req.files.find((e) => e.fieldname === "idFrontImage");
    const idBackImage = req.files.find((e) => e.fieldname === "idBackImage");

    const profileImageUploader = new ImageStorage(profileImage);
    const idFrontImageUploader = new ImageStorage(idFrontImage);
    const idBackImageUploader = new ImageStorage(idBackImage);


    UserModal.findById(userId, async function (err, doc) {
        if (err) {
            console.log(`caught error while finding user`);
        } else {
            if (profileImage) {
                const arr = Object.values(JSON.parse(doc.profileImage))
                arr.map((e) => deleteFile(e))
            }
            if (idFrontImage) {
                const arr = Object.values(JSON.parse(doc.idFrontImage))
                arr.map((e) => deleteFile(e))
            }
            if (idBackImage) {
                const arr = Object.values(JSON.parse(doc.idBackImage))
                arr.map((e) => deleteFile(e))
            }
            nin ? (doc.nin = nin) : null;
            regionOfOperation ? (doc.regionOfOperation = regionOfOperation) : null;
            qualification ? (doc.qualification = qualification) : null;
            specialities ? (doc.specialities = specialities) : null;
            aboutSelf ? (doc.aboutSelf = aboutSelf) : null;
            startingFee ? (doc.startingFee = startingFee) : null;
            profession ? (doc.profession = profession) : null;
            role != null ? (doc.role = role) : null;
            // =========================================================================storing images
            profileImage!==undefined
              ? (doc.profileImage = await profileImageUploader.uploadImage())
              : null;
              idFrontImage!==undefined
              ? (doc.idFront = await idFrontImageUploader.uploadImage())
              : null;
              idBackImage!==undefined
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
                console.log(err)
              );
        }
    });
};
