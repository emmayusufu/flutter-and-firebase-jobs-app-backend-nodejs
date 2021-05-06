const { HiringModal } = require("../../models");
const { db, msg } = require("../../config/firebase");
const { hiringStatus } = require("../../utilities/constants");

exports.declineHiring = (req, res, next) => {
  const { docRef } = req.body;

  const ref = db.collection("hirings");
  doc(docRef);

  ref
    .get()
    .then((data) => {
      const { clientId, workManId, location, description } = data.data();

      const hiring = new HiringModal({
        clientId,
        workManId,
        description,
        clientLocation: location,
        hiringStatus: hiringStatus.cancelled,
      });

      hiring
        .save()
        .then(() => {
          ref
            .delete()
            .then(function () {
              db.collection(userTokens)
                .doc(req.body.workManId)
                .get()
                .then((snapshot) => {
                  if (snapshot.exists) {
                    const { tokens } = snapshot.data();
                    msg
                      .sendToDevice(
                        tokens,
                        {
                          data: {
                            message: "declined",
                          },
                        },
                        {
                          contentAvailable: true,
                          priority: "high",
                        }
                      )
                      .then(() => {
                        res.json({ message: "success" });
                      })
                      .catch((err) => next(new Error()));
                  }
                })
                .catch((err) => next(new Error(err)));
            })
            .catch((err) => next(new Error(err)));
        })
        .catch((err) => {
          next(new Error(err));
        });
    })
    .catch((err) => next(new Error(err)));
};
