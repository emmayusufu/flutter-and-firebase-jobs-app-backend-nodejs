const JobModal = require("../../modals/job");

exports.getUserJobs = (req, res) => {
  const { id } = req.params;

  JobModal.findAll({ where: { id: id } })
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.updateJob = (req, res) => {
  const { rating, review } = req.body;

  const { id } = req.params;

  JobModal.findOne({ where: { id: id } })
    .then((job) => {
      job.rating = rating;
      job.review = review;
      job.completed = true;
      job.save();
    })
    .catch((e) => {
      console.log(e);
    });
};
