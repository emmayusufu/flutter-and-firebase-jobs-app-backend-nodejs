const { UserModal } = require("../../modals");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.updateAccount = ({
  areaOfOperation,
  qualification,
  specialities,
  profession,
  client,
  workman,
  aboutSelf,
  startingFee,
  id,
  idFront,
  idBack,
  dpImage,
  nin,
  res,
}) => {
  UserModal.findById(id, async function (err, doc) {
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
      dpImage != null
        ? (doc.dpImage = await getImageUrl(dpImage).catch((e) => {
            //==================== dp Image
            console.log(`caught error :${e} while storing dpimage`);
          }))
        : null;
      idFront != null
        ? (doc.idFront = await getImageUrl(idFront).catch((e) => {
            //==================== idFront Image
            console.log(`caught error :${e} while storing idfront image`);
          }))
        : null;
      idBack != null
        ? (doc.idBack = await getImageUrl(idBack).catch((e) => {
            //==================== idBack Image
            console.log(`caught error :${e} while storing id back image`);
          }))
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
