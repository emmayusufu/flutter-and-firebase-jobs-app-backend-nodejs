const { UserModal, HiringModal } = require("../../modals");
const { sms } = require("../../utilities/africastalking");
const { db, msg } = require("../../utilities/firebase/admin_config");

exports.hireWorkMan = (req, res) => {
  const { workmanID } = req.params;
  const {
    clientID,
    description,
    clientName,
    location,
    contact,
    clienImage,
  } = req.body;

  //  ================================================================== creating new job
  // const hiring = new HiringModal({
  //   clientID,
  //   workmanID,
  //   description,
  //   clientName,
  //   location,
  //   contact,
  //   clienImage,
  // });

  const ref = db.collection("userData").doc(workmanID);
  const hiringsRef = db
    .collection("users")
    .doc(workmanID)
    .collection("hirings");

  // ================================================================== finding requested workman
  UserModal.findOne({ _id: workmanID }, null, function (err, workman) {
    if (err) {
      console.log(
        `caught error ${err} while finding workMan with id :${workmanID}`
      );
      res.json();
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
          clienImage,
          accepted: false,
          denied: false,
          createdAt: Date.now(),
        })
        .then(() => {
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
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    msg.sendToDevice(
                      tokens,
                      {
                        data: {
                          message: "timeOut",
                        },
                      },
                      {
                        // Required for background/quit data-only messages on iOS
                        contentAvailable: true,
                        // Required for background/quit data-only messages on Android
                        priority: "high",
                      }
                    );
                  }, 10000);
                })
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // ================================================================== then save hiring and send notification to workman
      // hiring
      //   .save()
      //   .then(() => {

      //   })
      //   .catch((err) => {
      //     console.log(`caught error :${err} while saving hire`);
      //   });
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
    .update({
      declined: true,
    })
    .then(() => {
      res.json({
        message: "success",
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
exports.updatehiring = (req, res) => {
  const { workManRating, review, clientRating } = req.body;

  const { id } = req.params;

  HiringModal.findOne({ _id: id })
    .then((hiring) => {
      hiring.workManRating = workManRating;
      hiring.clientRating = clientRating;
      hiring.review = review;
      hiring.completed = true;
      hiring.save();
    })
    .catch((e) => {
      console.log(e);
    });
};
