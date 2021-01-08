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
      dpImage: await getImageUrl(dpImage).catch((e) => {
        console.log(`caught error :${e} while storing dpimage`);
      }),
      idFront: await getImageUrl(idFront).catch((e) => {
        console.log(`caught error :${e} while storing idfront image`);
      }),
      idBack: await getImageUrl(idBack).catch((e) => {
        console.log(`caught error :${e} while storing id back image`);
      }),
      workman: true,
    },
    function (err, user) {
      res.json({
        message: "success",
      });
    }
  );
};
