const { db} = require("../../config/firebase");

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