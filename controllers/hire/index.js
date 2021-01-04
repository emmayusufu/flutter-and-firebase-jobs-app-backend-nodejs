const UserModal = require("../../modals/user");
const JobModal = require("../../modals/job");

exports.hireWorkMan = (req, res) => {
  const { id } = req.params;

  UserModal.findOne({ where: { id: id } })
    .then((user) => {})
    .catch((e) => console.log(e));
};
