const {HiringModal} = require("../../models");

exports.getClientHirings = (req, res) => {
    const {clientId} = req.params;
    const {limit} = req.query;
    HiringModal.find(
        {
            clientId: clientId,
        }).limit(parseInt(limit)
    ).exec((err, hirings) => {
        if (err) {
            throw new Error("failed to find hirings");
        } else if (!err) {
            res.json({
                message: 'success',
                hirings: hirings,
            });
        }
    });
};

exports.getWorkManHirings = (req, res) => {
    const {workManId} = req.params;
    const {limit} = req.query;
    HiringModal.find(
        {
            workManId: workManId,
        }).limit(parseInt(limit)).exec((err, hirings) => {
        if (err) {
            throw new Error("failed to find hirings");
        } else if (!err) {
            res.json({
                message: 'success',
                hirings: hirings,
            });
        }
    });
};
