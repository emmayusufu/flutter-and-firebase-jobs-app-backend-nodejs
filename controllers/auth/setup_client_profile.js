const UserModal = require("../../modals/user");
const { cloudinary } = require("../../utilities/cloudinary");

exports.setupClientProfile = ({ id, firstName, lastName, image, res }) => {
  UserModal.findOne({ where: { id: id } })
    .then((user) => {
      if (user) {
        cloudinary.uploader.upload(image, function (error, result) {
          (user.firstName = firstName),
            (user.lastName = lastName),
            (user.dpImage = result.url);
          user.workman = false;
          user.client = true;
          user
            .save()
            .then(() => {
              res.json({ message: "success" });
            })
            .catch((e) =>
              console.log(`caught error ${e} while saving image to cloud`)
            );
        });
      } else {
        res.json({ message: "user_not_found" });
      }
    })
    .catch((e) => {
      console.log(`caught error ${e} user with id : ${id}`);
    });
};
