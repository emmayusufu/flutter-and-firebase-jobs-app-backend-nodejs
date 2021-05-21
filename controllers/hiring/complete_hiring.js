const {UserModal, HiringModal} = require("../../models");
const {db} = require("../../config/firebase");
const {hiringStatus} = require("../../utilities/constants")

exports.completeHiring = (req, res, next) => {
    const {review, docRef} = req.body;
    const workManRating = parseFloat(req.body.workManRating);

    const ref = db
        .collection('hirings')
        .doc(docRef.split("/")[1])

    ref
        .get()
        .then((data) => {
            const {
                clientId,
                workManId,
                description,
            } = data.data();


            UserModal.findById(workManId, function (err, workman) {
                if (err) {
                    throw new Error(err)
                }
                workman.rating = (workman.rating + workManRating) / 2;
                workman
                    .save()
                    .then(() => {
                        const hiring = new HiringModal({
                            clientId,
                            workManId,
                            description,
                            review,
                            workManRating,
                            hiringStatus: hiringStatus.complete
                        });

                        hiring
                            .save()
                            .then(() => {
                                ref.delete().then(function () {
                                    res.json({message: "success"});
                                });
                            })
                            .catch((err) => {
                                next(new Error(err));
                            });
                    })
                    .catch((err) => {
                        next(new Error(err))
                    });
            });
        })
        .catch((err) => {
            next(new Error(err))
        });
};