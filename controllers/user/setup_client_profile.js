const { UserModal } = require("../../models");
const { userRoles } = require("../../utilities");
const ImageStorage = require("../../utilities/image_storage");

exports.setupClientProfile = async (req, res) => {
  const { userId, firstName, lastName} = req.body;
  const profileImage = req.file;
  const imageStorage = new ImageStorage(profileImage);
  if(userId&&firstName&&lastName){
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
        if (err) console.log(err);
        res.json({
          message: "success",
          user: user,
        });
      }
    );
  }else {
    res.json({message:"missing_arguments"})
  }
};
