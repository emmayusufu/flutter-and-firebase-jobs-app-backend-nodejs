const { sms } = require("../../config/africas_talking");
const { db, msg } = require("../../config/firebase");

exports.hireWorkMan = (req, res, next) => {
  const {
    clientId,
    workManId,
    description,
    clientName,
    clientPhoneNumber,
    workManPhoneNumber,
    clientImage,
  } = req.body;

  sms
    .send({
      to: [workManPhoneNumber],
      message: `You currently have a pending hire, kindly accept or decline the hire else hire will be cancelled automatically shortly`,
    })
    .catch((err) => {
      next(new Error(err));
    });

  db.collection("hirings")
    .add({
      description,
      clientName,
      clientPhoneNumber,
      clientId,
      workManId,
      clientImage:clientImage,
      accepted: false,
      createdAt: Date.now(),
    })
    .then((doc) => {
      db.collection("userTokens")
        .doc(workManId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
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
                  contentAvailable: true,
                  priority: "high",
                }
              )
              .then(() => {
                res.json({ message: "ok" });
              })
              .then(() => {
                setTimeout(() => {
                  db.collection("hirings")
                    .doc(doc.path)
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
                                db.collection("hirings").doc(doc.path).delete();
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
                      next(err);
                    });
                }, 30000);
              })
              .catch((err) => next(err));
          } else {
            next(new Error("Failed to get user"));
          }
        });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
