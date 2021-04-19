const { UserModal } = require("../../models");

exports.getUser = (req, res) => {
  const query = req.query;
  const { userId } = req.params;

  const fields = query.fields.replace(/,/g, " ");
  UserModal.findOne({ _id: userId }, fields , function (doc, err) {
    if (err) {
      res.status(503).json({ err });
    } else {
      if (doc) {
        res.json(doc);
      } else if (!doc) {
        res.json({ message: "user_does_not_exist" });
      }
    }
  });
};

exports.getUsers = (req, res) => {
  const query = req.query;
  const fields = query.fields.replace(/,/g, " ");
  UserModal.find({}, fields, function (err, docs) {
    if (err) {
      res.status(503).json({ message: `error ${err}` });
    } else if (!err) {
      if (docs) {
        res.json(docs);
      } else if (!docs) {
        res.json({ message: "no_users_found" });
      }
    }
  });
};



// // ==================================================== updating user account
// exports.updateAccount = async (req, res) => {
//   const { id } = req.params;
//   const {
//     areaOfOperation,
//     qualification,
//     specialities,
//     profession,
//     client,
//     workman,
//     aboutSelf,
//     startingFee,
//     nin,
//   } = req.body;

//   const dpImage = req.files.find((e) => e.fieldname == "dpImage");
//   const idBack = req.files.find((e) => e.fieldname == "idBack");
//   const idFront = req.files.find((e) => e.fieldname == "idFront");

//   updateAccount({
//     areaOfOperation,
//     id,
//     qualification,
//     specialities,
//     profession,
//     client,
//     workman,
//     aboutSelf,
//     startingFee,
//     nin,
//     idFront,
//     idBack,
//     dpImage,
//     res,
//   });
// };
