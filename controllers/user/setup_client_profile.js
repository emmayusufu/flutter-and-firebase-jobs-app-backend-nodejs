const { UserModal } = require("../../models");
const { userRoles } = require("../../utilities/constants");
const ImageStorage = require("../../utilities/image_storage");

exports.setupClientProfile = async (req, res, next) => {
  const { userId, firstName, lastName } = req.body;
  const profileImage = req.file;
  const imageStorage = new ImageStorage(profileImage);
  if (userId && firstName && lastName) {
    UserModal.findOneAndUpdate(
      { _id: userId },
      {
        firstName,
        lastName,
        profileImage: await imageStorage.uploadImage(),
        role: userRoles.client,
      },
      {
        new: true,
      },
      function (err, user) {
        if (err) {
          throw new Error(err);
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
      }
    );
  } else {
    res.json({ message: "missing_arguments" });
  }
};
