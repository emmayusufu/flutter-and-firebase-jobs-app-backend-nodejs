const { UserModal} = require("../../models");

exports.getHirings = (req, res) => {
  const { clientID } = req.params;
  UserModal.findOne({ clientID: clientID }, null, function (err, docs) {
    if (err)
      console.log(`caught error :${err} while retrieving client hirings`);
    res.json({
      message: "success",
    });
  });
};

