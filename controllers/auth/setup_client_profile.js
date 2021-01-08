const { UserModal } = require("../../modals");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupClientProfile = async ({
  id,
  firstName,
  lastName,
  image,
  res,
}) => {
  UserModal.updateOne(
    { _id: id },
    {
      firstName,
      lastName,
      dpImage: await getImageUrl(image),
      client: true,
    },
    function (err, user) {
      res.json({
        message: "success",
      });
    }
  );
};
