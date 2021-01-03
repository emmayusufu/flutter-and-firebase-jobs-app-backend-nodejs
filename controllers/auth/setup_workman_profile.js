const UserModal = require("../../modals/user");
const { cloudinary } = require("../../utilities/cloudinary");

exports.setupWorkManProfile = ({
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
  idBack,
  idFront,
  res,
}) => {
  UserModal.findOne({ where: { id: id } })
    .then((user) => {
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.areaOfOperation = areaOfOperation;
        user.dob = dob;
        user.qualification = qualification;
        user.extraSkills = extraSkills;
        user.nin = nin;
        user.profession = profession;
        user
          .save()
          .then(() => {
            cloudinary.uploader
              .upload(dpImage, function (error, result) {
                user.dpImage = result.url;
                user.save();
              })
              .then(() => {
                cloudinary.uploader
                  .upload(idFront, function (error, result) {
                    user.idFront = result.url;
                    user.save();
                  })
                  .then(() => {
                    cloudinary.uploader.upload(
                      idBack,
                      function (error, result) {
                        user.idBack = result.url;
                        user.save().then(() => {
                          res.json({ message: "success" });
                        });
                      }
                    );
                  });
              });
          })
          .catch((e) => console.log(e));
      } else {
        res.json();
      }
    })
    .catch((e) => console.log(`caught error ${e}`));
};
