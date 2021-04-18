const { UserModal } = require("../../models");
const { setupClientProfile } = require("./setup_client_profile");
const { setupWorkManProfile } = require("./setup_workman_profile");
const { updateAccount } = require("./update_account");

exports.getUser = (req, res) => {
  const query = req.query;
  const {userId} = req.params;

  const fields = query.fields.replace(/,/g, " ")
  UserModal.findOne({_id:userId}, { fields },function(doc, err){
    if(err){
      res.status(503).json({err})
    }else{
      if(doc){
        res.json({user:doc})
      }else if(!doc){
        res.json({message:"user_does_not_exist"})
      }
    }
  })
  
};

exports.getUsers = (req, res) => {
  const query = req.query;
  const fields = query.fields.replace(/,/g, " ")
  UserModal.find({ fields },function(doc, err){
    if(err){
      res.status(503).json({err})
    }else{
      if(doc){
        res.json({user:doc})
      }else if(!doc){
        res.json({message:"user_does_not_exist"})
      }
    }
  })
};

// // ==================================================== setting up client profile
// exports.setupClientProfile = (req, res) => {
//   const { id, firstName, lastName } = req.body;

//   setupClientProfile({ firstName, id, image: req.file, lastName, res });
// };

// // ==================================================== setting up workman profile
// exports.setupWorkManProfile = (req, res) => {
//   const {
//     id,
//     firstName,
//     lastName,
//     areaOfOperation,
//     dob,
//     qualification,
//     specialities,
//     nin,
//     profession,
//     aboutSelf,
//     startingFee,
//   } = req.body;

//   const dpImage = req.files.find((e) => e.fieldname == "dpImage");
//   const idBack = req.files.find((e) => e.fieldname == "idBack");
//   const idFront = req.files.find((e) => e.fieldname == "idFront");

//   setupWorkManProfile({
//     id,
//     firstName,
//     lastName,
//     areaOfOperation,
//     dob,
//     qualification,
//     specialities,
//     nin,
//     profession,
//     dpImage,
//     idBack,
//     idFront,
//     aboutSelf,
//     startingFee,
//     res,
//   });
// };

// // ==================================================== getting all clients
// exports.allClients = (req, res) => {
//   UserModal.find({ client: true }, function (err, clients) {
//     if (err) {
//       console.log(err);
//       res.json({ message: `caught error:${err}` });
//     } else if (!err) {
//       res.json(clients);
//     }
//   });
// };

// // ==================================================== getting all workmen
// exports.allWorkmen = (req, res) => {
//   const { id } = req.params;
//   UserModal.find({ workman: true }, function (err, workmen) {
//     if (err) {
//       console.log(err);
//       res.json({ message: `caught error:${err}` });
//     } else if (!err) {
//       res.json(
//         workmen.filter((e) => {
//           return e._id != id;
//         })
//       );
//     }
//   });
// };

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
