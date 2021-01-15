const { HiringModal } = require("../../modals");

exports.getUserHirings = (req, res) => {
  const { id } = req.params;

  JobModal.findAll({ where: { id: id } })
    .then((hirings) => {
      res.json(hirings);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.updatehiring = (req, res) => {
  const { rating, review } = req.body;

  const { id } = req.params;

  HiringModal.findOne({ where: { id: id } })
    .then((hiring) => {
      hiring.rating = rating;
      hiring.review = review;
      hiring.completed = true;
      hiring.save();
    })
    .catch((e) => {
      console.log(e);
    });
};
