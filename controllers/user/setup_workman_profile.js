const { UserModal } = require("../../models");
const { getImageUrl } = require("../../utilities/helper-functions");

exports.setupWorkManProfile = async ({
  id,
  firstName,
  lastName,
  areaOfOperation,
  dob,
  qualification,
  specialities,
  nin,
  profession,
  aboutSelf,
  startingFee,
  profileImage,
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
      qualification,
      specialities,
      nin,
      profession,
      aboutSelf,
      startingFee,
      profileImage: await getImageUrl(profileImage).catch((e) => {
        console.log(`caught error :${e} while storing profile_image`);
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
        user: user,
      });
    }
  );
};
