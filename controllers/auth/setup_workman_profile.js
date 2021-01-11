const { UserModal } = require("../../modals");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupWorkManProfile = async ({
  id,
  firstName,
  lastName,
  areaOfOperation,
  dob,
  specialities,
  extraSkills,
  nin,
  profession,
  aboutSelf,
  startingFee,
  dpImage,
  idFront,
  idBack,
  res,
}) => {
  UserModal.findOneAndUpdate(
    { _id: id },

    {
      firstName,
      lastName,
      areaOfOperation,
      dob,
      specialities,
      extraSkills,
      nin,
      profession,
      aboutSelf,
      startingFee,
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
    { new: true, useFindAndModify: false },
    function (err, user) {
      if (err) console.log(err);
      res.json({
        message: "success",
        user,
      });
    }
  );
};
