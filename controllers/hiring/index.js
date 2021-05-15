const { HiringModal } = require("../../models");

exports.getHirings = (req, res) => {
  const { workManId, clientId } = req.query;
  HiringModal.find(
    {
      workManId: workManId,
      clientId: clientId,
    },
    (err, hirings) => {
      if (err) {
        throw new Error("failed to find hirings");
      } else if (!err) {
        res.json({
          message: success,
          hirings: hirings,
        });
      }
    }
  );
};
