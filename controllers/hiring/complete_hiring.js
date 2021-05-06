const { UserModal, HiringModal } = require("../../models");
const { db} = require("../../config/firebase");
const {hiringStatus} = require("../../utilities/constants")

exports.completeHiring = (req, res,next) => {
    const { workManRating, review, docRef } = req.body;
  
  
    const ref = db
      .collection('hirings')
      .doc(docRef)
  
    ref
      .get()
      .then((data) => {
        const {
          clientId,
          workmanId,
          location,
          description,
        } = data.data();
  
        UserModal.findById(workmanID, function (err, doc) {
          if (err) {
            throw new Error(err)
          };
          doc.rating = (doc.rating + workManRating) / 2;
          doc
            .save()
            .then(() => {
              const hiring = new HiringModal({
                clientId,
                workmanId,
                description,
                clientLocation: location,
                review,
                workManRating,
                hiringStatus:hiringStatus.complete
              });
  
              hiring
                .save()
                .then(() => {
                  ref.delete().then(function () {
                    res.json({ message: "success" });
                  });
                })
                .catch((err) => {
                 next(new Error(err));
                });
            })
            .catch((err) => {
              next(new Error(err))
            });
        });
      })
      .catch((err) => {
        next(new Error(err))
      });
  };