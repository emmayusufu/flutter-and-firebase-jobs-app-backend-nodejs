// const { UserModal } = require("../../modals");
// const { cloudinary } = require("../../utilities/cloudinary");

const { auth } = require("../../utilities/firebase/admin_config");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupClientProfile = async ({
  id,
  firstName,
  lastName,
  image,
  res,
}) => {
  auth
    .updateUser(id, {
      displayName: `${firstName} ${lastName}`,
      photoURL: await getImageUrl(image),
    })
    .then((userRecord) => {
      res.json({ message: "success", user: userRecord.toJSON() });
    })
    .catch((error) => {
      console.log("Error updating user:", error);
    });
};

// exports.setupClientProfile = ({ id, firstName, lastName, image, res }) => {
//   UserModal.findOne({ where: { id: id } })
//     .then((user) => {
//       if (user) {
//         cloudinary.uploader.upload(image, function (error, result) {
//           (user.firstName = firstName),
//             (user.lastName = lastName),
//             (user.dpImage = result.url);
//           user.workman = false;
//           user.client = true;
//           user
//             .save()
//             .then(() => {
//               res.json({ message: "success" });
//             })
//             .catch((e) =>
//               console.log(`caught error ${e} while saving image to cloud`)
//             );
//         });
//       } else {
//         res.json({ message: "user_not_found" });
//       }
//     })
//     .catch((e) => {
//       console.log(`caught error ${e} user with id : ${id}`);
//     });
// };
