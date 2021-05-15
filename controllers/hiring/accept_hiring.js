const { db } = require("../../config/firebase");

exports.acceptHiring = (req, res, next) => {
  const docRef = req.body.docRef.split("/")[1];

  db.collection("hirings")
    .doc(docRef)
    .update({
      accepted: true,
    })
    .then(() => {
      res.json({
        message: "success",
      });
    })
    .catch((err) => next(new Error(err)));
};
