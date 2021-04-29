const { UserModal, HiringModal } = require("../../models");
const { db} = require("../../config/firebase");

exports.completeHiring = (req, res) => {
    const { workManRating, review, docRef } = req.body;
  
    const array = docRef.split("/");
  
    const ref = db
      .collection(array[0])
      .doc(array[1])
      .collection(array[2])
      .doc(array[3]);
  
    ref
      .get()
      .then((data) => {
        const {
          clientID,
          workmanID,
          location,
          contact,
          clienImage,
          clientName,
          description,
        } = data.data();
  
        UserModal.findById(workmanID, null, function (err, doc) {
          if (err) console.log(err);
          doc.rating = (doc.rating + workManRating) / 2;
          doc
            .save()
            .then(() => {
              const hiring = new HiringModal({
                clientID,
                workmanID,
                description,
                clientName,
                clientLocation: location,
                clientContact: contact,
                clientImage: clienImage,
                accepted: true,
                completed: true,
                review,
                workManRating,
              });
  
              hiring
                .save()
                .then(() => {
                  ref.delete().then(function () {
                    res.json({ message: "success" });
                  });
                })
                .catch((err) => {
                  console.log(`caught error :${err} while saving hire`);
                });
            })
            .catch((err) => console.log(`caught error: ${err} `));
        });
      })
      .catch((err) => console.log(err));
  };