const { UserModal } = require("../../models");
const { sms } = require("../../config/africas_talking");
const { db, msg } = require("../../config/firebase");

exports.hireWorkMan = (req, res, next) => {
  const {
    clientId,
    workmanId,
    description,
    clientName,
    location,
    clientContact,
    clientImage,
  } = req.body;

  //  ================================================================== creating new job

  const ref = db.collection("userData").doc(workmanId);
  const hiringsRef = db
    .collection("users")
    .doc(`${workmanId}/${clientId}`)
    .collection("hirings");

  // ================================================================== finding requested workman
  UserModal.findOne({ _id: workmanId }, null, function (err, workman) {
    if (err) {
      console.log(
        `caught error ${err} while finding workMan with id :${workmanId}`
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
          clientContact,
          clientId,
          workmanId,
          clientImage,
          accepted: false,
          createdAt: Date.now(),
        })
        .then((doc) => {
          ref.get().then((snapshot) => {
            if (!snapshot.exists) {
              res.json({ message: "user does not exist" });
            } else {
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
                          .doc(clientId)
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
