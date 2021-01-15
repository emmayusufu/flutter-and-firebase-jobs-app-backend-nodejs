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
  });
  // ================================================================== finding requested workman
  UserModal.findOne({ _id: workmanID }, null, function (err, workman) {
    if (err) {
      console.log(
        `caught error ${err} while finding workMan with id :${workmanID}`
      );
    } else {
      const ref = db.collection("hiring").doc(workmanID);
      ref.set({
        description,
        clientPhoneNumber,
        clientName,
        location,
        contact,
      });

      // ================================================================== sending workman an sms
      // sms
      //   .send({
      //     to: [workman.phoneNumber],
      //     message: `You currently have a pending hire, kindly go online and accept or decline the hire else hire will be cancelled automatically in the next 1 minute`,
      //   }).then(()=>{
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // ================================================================== then save job and send notification to workman
      // job
      //   .save()
      //   .then(() => {})
      //   .catch((err) => {
      //     console.log(`caught error :${err} while saving job`);
      //   });
    }
  });
};
