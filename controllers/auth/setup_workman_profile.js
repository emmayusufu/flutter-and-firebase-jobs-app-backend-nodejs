const { UserModal } = require("../../modals");
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
  idFront,
  idBack,
  res,
}) => {
  UserModal.updateOne(
    { _id: id },
    {
      firstName,
      lastName,
      areaOfOperation,
      dob,
      qualification,
      extraSkills,
      nin,
      profession,
      dpImage: await getImageUrl(dpImage),
      idFront: await getImageUrl(idFront),
      idBack: await getImageUrl(idBack),
      workman: true,
    },
    function (err, user) {
      res.json({
        message: "success",
      });
    }
  );
};
