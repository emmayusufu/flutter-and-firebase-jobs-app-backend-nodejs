const { UserModal, HiringModal } = require("../../models");
const { sms } = require("../../config/africas_talking");
const { db, msg } = require("../../config/firebase");

exports.hireWorkMan = (req, res) => {
  const { workmanID } = req.params;
  const {
    clientID,
    description,
    clientName,
    location,
    contact,
    clientImage,
    geocodes,
  } = req.body;

  //  ================================================================== creating new job

  const ref = db.collection("userData").doc(workmanID);
  const hiringsRef = db
    .collection("users")
    .doc(`${workmanID}/${clientID}`)
    .collection("hirings");

  // ================================================================== finding requested workman
  UserModal.findOne({ _id: workmanID }, null, function (err, workman) {
    if (err) {
      console.log(
        `caught error ${err} while finding workMan with id :${workmanID}`
      );
      res.status(503).json();
    } else {
      // ================================================================== sending workman an sms if is offline
      if (workman) {
        sms
          .send({
            to: [workman.phoneNumber],
            message: `You currently have a pending hire, kindly go online and accept or decline the hire else hire will be cancelled automatically in the next 1 minute`,
          })
          .catch((err) => {
            console.log(err);
          });
      }

      hiringsRef
        .add({
          description,
          clientName,
          location,
          contact,
          clientID,
          workmanID,
          clientImage,
          geocodes: JSON.parse(geocodes),
          accepted: false,
          createdAt: Date.now(),
        })
        .then((doc) => {
          ref.get().then((snapshot) => {
            if (!snapshot.exists) console.log("user does not exist");
            else {
              const { tokens } = snapshot.data();
              msg
                .sendToDevice(
                  tokens,
                  {
                    data: {
                      description: description,
                    },
                    notification: {
                      title: "Hire",
                      body: description,
                    },
                  },
                  {
                    // Required for background/quit data-only messages on iOS
                    contentAvailable: true,
                    // Required for background/quit data-only messages on Android
                    priority: "high",
                  }
                )
                .then(() => {
                  res.json({
                    message: "success",
                    docRef: doc.path,
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    const array = doc.path.split("/");
                    db.collection(array[0])
                      .doc(array[1])
                      .collection(array[2])
                      .doc(array[3])
                      .get()
                      .then((data) => {
                        const { accepted } = data.data();

                        db.collection("userData")
                          .doc(clientID)
                          .get()
                          .then((clientTokens) => {
                            const { tokens } = clientTokens.data();

                            if (accepted == false) {
                              msg
                                .sendToDevice(
                                  tokens,
                                  {
                                    data: {
                                      message: "timeOut",
                                    },
                                  },
                                  {
                                    contentAvailable: true,
                                    priority: "high",
                                  }
                                )
                                .then(() => {
                                  db.collection(array[0])
                                    .doc(array[1])
                                    .collection(array[2])
                                    .doc(array[3])
                                    .delete();
                                });
                            } else if (accepted == true) {
                              msg.sendToDevice(
                                tokens,
                                {
                                  data: {
                                    message: "accepted",
                                  },
                                },
                                {
                                  contentAvailable: true,
                                  priority: "high",
                                }
                              );
                            }
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }, 30000);
                })
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

// ================================================================== accept hiring
exports.acceptHiring = (req, res) => {
  const { docRef } = req.body;

  const array = docRef.split("/");

  const ref = db
    .collection(array[0])
    .doc(array[1])
    .collection(array[2])
    .doc(array[3]);
  ref
    .update({
      accepted: true,
    })
    .then(() => {
      res.json({
        message: "success",
      });
    })
    .catch((err) => console.log(err));
};
// ================================================================== decline hiring
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

// ================================================================== gettinga specific client's hirings
exports.getClientHirings = (req, res) => {
  const { clientID } = req.params;
  UserModal.findOne({ clientID: clientID }, null, function (err, hirings) {
    if (err)
      console.log(`caught error :${err} while retrieving client hirings`);
    res.json({
      message: "success",
    });
  });
};

// ================================================================== gettinga specific workMan's hirings
exports.getWorkManHirings = (req, res) => {
  const { workmanID } = req.params;
  UserModal.findOne({ workmanID: workmanID }, null, function (err, hirings) {
    if (err)
      console.log(`caught error :${err} while retrieving client hirings`);
    res.json({
      message: "success",
    });
  });
};

// ================================================================== updating a specific hiring
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
