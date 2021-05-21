const { UserModal } = require("../../models");

exports.getProfessions = (req, res) => {
  UserModal.find()
    .select({ profession: 1 })
    .exec((err, docs) => {
      if (err) throw new Error(err.message);
      res.json({ professions: docs });
    });
};

exports.getUser = (req, res) => {
  const query = req.query;
  const { userId } = req.params;
  const fields = query.fields.replace(/,/g, " ");

  UserModal.findOne({ _id: userId }, fields, function (err, doc) {
    if (err) {
      throw new Error(err);
    } else {
      if (doc) {
        res.json({ user: doc });
      } else if (!doc) {
        res.json({ message: "user_does_not_exist" });
      }
    }
  });
};

exports.getUsers = async (req, res, next) => {
  const query = req.query;
  try {
    const fields = query.fields.replace(/,/g, " ");
    const { role, userId, profession } = req.query;
    const limit = parseInt(query.limit);
    UserModal.find({
      role: role,
      profession:profession === 'null' ? { $ne: null } : profession,
      _id: { $ne: userId },
    })
      .select(fields)
      .limit(limit)
      .exec((err, docs) => {
        if (err) {
          throw new Error(err.message);
        } else if (!err) {
          if (docs) {
            res.json({
              count:docs.length,
              users: docs,
              message: "success",
            });
          } else if (!docs) {
            res.json({ message: "no_users_found" });
          }
        }
      });
  } catch (err) {
    next(new Error(err));
  }
};
