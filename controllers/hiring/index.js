const { HiringModal} = require("../../models");

exports.getHirings = (req, res) => {
  
 HiringModal.find().exec((err,docs)=>{})
};

