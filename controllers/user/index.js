const { UserModal } = require("../../models");

exports.getUser = (req, res) => {
  const query = req.query;
  const { userId } = req.params;

  const fields = query.fields.replace(/,/g, " ");
  UserModal.findOne({ _id: userId }, fields, function (err, doc) {
    if (err) {
      res.status(503).json({ err });
    } else {
      if (doc) {
        res.json(JSON.parse(doc.profileImage));
      } else if (!doc) {
        res.json({ message: "user_does_not_exist" });
      }
    }
  });
};

exports.getUsers = (req, res) => {
  const query = req.query;
  if (query.fields) {
    const fields = query.fields.replace(/,/g, " ");
    const role = query.role;
    UserModal.find(
      {
        role: role,
      },
      fields,
      function (err, docs) {
        if (err) {
          res.status(503).json({ message: `error ${err}` });
        } else if (!err) {
          if (docs) {
            res.json(docs);
          } else if (!docs) {
            res.json({ message: "no_users_found" });
          }
        }
      }
    );
  } else {
    res.status(403).json();
  }
};

