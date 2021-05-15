const { UserModal } = require("../../models");

exports.getProfessions = (req,res,next)=>{
  UserModal.find().select({profession:1}).exec((err,docs)=>{
    if(err) throw new Error(err)
    res.json({professions:docs});
  })
}

exports.getUser = (req, res, next) => {
  const query = req.query;
  const { userId } = req.params;
  const fields = query.fields.replace(/,/g, " ");

  UserModal.findOne({ _id: userId }, fields, function (err, doc) {
    if (err) {
      throw new Error(err);
    } else {
      if (doc) {
        res.json({user:doc});
      } else if (!doc) {
        res.json({ message: "user_does_not_exist" });
      }
    }
  });
};

exports.getUsers = (req, res, next) => {
  const query = req.query;
  if (query.fields) {
    const fields = query.fields.replace(/,/g, " ");
    const role = query.role;
    const userId = query.userId;
    UserModal.find({
      role: role,
      _id: { $ne: userId },
    })
      .select(fields)
      .exec((err, docs) => {
        if (err) {
          throw new Error(err);
        } else if (!err) {
          if (docs) {
            res.json({
              users: docs,
              message: "success",
            });
          } else if (!docs) {
            res.json({ message: "no_users_found" });
          }
        }
      });
  } else {
    res.status(403).json({ message: "failed" });
  }
};
