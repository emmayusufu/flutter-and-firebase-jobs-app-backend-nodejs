// const { UserModal } = require("../../modals");
// const { cloudinary } = require("../../utilities/cloudinary");

const { auth, db } = require("../../utilities/firebase/admin_config");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupWorkManProfile = async ({
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
}) => {
  auth
    .updateUser(id, {
      displayName: `${firstName} ${lastName}`,
      photoURL: await getImageUrl(dpImage),
    })
    .then(async (userRecord) => {
      db.collection("workmen")
        .doc(id)
        .set({
          areaOfOperation,
          dob,
          qualification,
          extraSkills,
          nin,
          profession,
          idBack: await getImageUrl(idBack),
          idFront: await getImageUrl(idFront),
        })
        .then(function (docRef) {
          res.json({ message: "success" });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      console.log("Error updating user:", error);
    });

  // UserModal.findOne({ where: { id: id } })
  //   .then((user) => {
  //     if (user) {
  //       user.firstName = firstName;
  //       user.lastName = lastName;
  //       user.areaOfOperation = areaOfOperation;
  //       user.dob = dob;
  //       user.qualification = qualification;
  //       user.extraSkills = extraSkills;
  //       user.nin = nin;
  //       user.profession = profession;
  //       user
  //         .save()
  //         .then(() => {
  //           cloudinary.uploader
  //             .upload(dpImage, function (error, result) {
  //               user.dpImage = result.url;
  //               user.save();
  //             })
  //             .then(() => {
  //               cloudinary.uploader
  //                 .upload(idFront, function (error, result) {
  //                   user.idFront = result.url;
  //                   user.save();
  //                 })
  //                 .then(() => {
  //                   cloudinary.uploader.upload(
  //                     idBack,
  //                     function (error, result) {
  //                       user.idBack = result.url;
  //                       user.save().then(() => {
  //                         res.json({ message: "success" });
  //                       });
  //                     }
  //                   );
  //                 });
  //             });
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       res.json();
  //     }
  //   })
  //   .catch((e) => console.log(`caught error ${e}`));
};
