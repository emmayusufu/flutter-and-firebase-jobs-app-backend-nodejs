const { UserModal } = require("../../modals");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupClientProfile = async ({
  id,
  firstName,
  lastName,
  image,
  res,
}) => {
  UserModal.findOneAndUpdate(
    { _id: id },
    {
      firstName,
      lastName,
      dpImage: await getImageUrl(image),
      client: true,
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
