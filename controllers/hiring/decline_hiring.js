const { HiringModal } = require("../../models");
const { db } = require("../../config/firebase");

exports.declineHiring = (req, res) => {
  const { docRef } = req.body;

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

      const hiring = new HiringModal({
        clientID,
        workmanID,
        description,
        clientName,
        clientLocation: location,
        clientContact: contact,
        clientImage: clienImage,
        declined: true,
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
    .catch((err) => console.log(err));
};
