const { UserModal } = require("../../models");
const { getImageUrl } = require("../../utilities/helper-functions");
const {user_roles} = require("../../utilities")

exports.setupClientProfile =  async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    profileImage
  } = req.body
  UserModal.findOneAndUpdate(
    { _id: userId },
    {
      firstName,
      lastName,
      profileImage: await getImageUrl(profileImage),
      role: user_roles.client,
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
};
