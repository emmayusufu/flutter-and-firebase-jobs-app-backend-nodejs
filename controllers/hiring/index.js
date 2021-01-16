const { UserModal, HiringModal } = require("../../modals");
const { sms } = require("../../utilities/africastalking");
const { db } = require("../../utilities/firebase/admin_config");

exports.hireWorkMan = (req, res) => {
  const { workmanID } = req.params;
  const {
    clientID,
    description,
    clientPhoneNumber,
    clientName,
    location,
    contact,
  } = req.body;

  //  ================================================================== creating new job
  const hiring = new HiringModal({
    clientID,
    workmanID,
    description,
    clientPhoneNumber,
    clientName,
    location,
    contact,
  });
  // ================================================================== finding requested workman
  UserModal.findOne({ _id: workmanID }, null, function (err, workman) {
    if (err) {
      console.log(
        `caught error ${err} while finding workMan with id :${workmanID}`
      );
    } else {
      const ref = db
        .collection("userData")
        .doc(workmanID)
        .collection("hirings");

      // ================================================================== sending workman an sms if is offline
      if (!workman.online) {
        sms
          .send({
            to: [workman.phoneNumber],
            message: `You currently have a pending hire, kindly go online and accept or decline the hire else hire will be cancelled automatically in the next 1 minute`,
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
      // ================================================================== then save hiring and send notification to workman
      hiring
        .save()
        .then(() => {
          ref
            .add({
              description,
              clientPhoneNumber,
              clientName,
              location,
              contact,
              createdAt: new Date.now(),
            })
            .then(() => {})
            .catch((err) =>
              console.log(`caught error :${err} while adding hiring`)
            );
        })
        .catch((err) => {
          console.log(`caught error :${err} while saving hire`);
        });
    }
  });
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
