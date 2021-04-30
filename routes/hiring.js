const router = require("express").Router();

const {hireWorkMan} = require('../controllers/hiring/hire_workman')
const {getHirings} = require('../controllers/hiring/index')
const {acceptHiring} = require('../controllers/hiring/accept_hiring')
const {declineHiring} = require('../controllers/hiring/decline_hiring')
const {completeHiring} = require('../controllers/hiring/complete_hiring')


router.post("/hire_workman", hireWorkMan);
router.get("/hirings/:userId", getHirings);
router.post("/accept_hiring", acceptHiring);
router.post("/decline_hiring", declineHiring);
router.get("/complete_hiring", completeHiring);


module.exports = router;