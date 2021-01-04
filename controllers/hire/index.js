const { UserModal, JobModal } = require("../../modals");

exports.hireWorkMan = (req, res) => {
  const { workmanID } = req.params;
  const { clientID, description } = req.body;

  UserModal.findOne({ where: { id: id } })
    .then((user) => {
      JobModal.create({
        description,
        clientID,
        workmanID,
      }).catch((e) => console.log(`caught error ${e} while creating job`));
    })
    .catch((e) => console.log(`caught error ${e} while finding user`));
};
