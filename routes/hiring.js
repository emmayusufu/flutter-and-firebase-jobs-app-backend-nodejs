const router = require("express").Router();

const {hireWorkMan} = require('../controllers/hiring/hire_workman')
const {getClientHirings, getWorkManHirings} = require('../controllers/hiring/index')
const {acceptHiring} = require('../controllers/hiring/accept_hiring')
const {declineHiring} = require('../controllers/hiring/decline_hiring')
const {completeHiring} = require('../controllers/hiring/complete_hiring')

module.exports = function (app) {

    router.post("/hire_workman", hireWorkMan);
    router.get("/client_hirings/:clientId", getClientHirings);
    router.get("/workman_hirings/:workManId", getWorkManHirings);
    router.post("/accept_hiring", acceptHiring);
    router.post("/decline_hiring", declineHiring);
    router.post("/complete_hiring", completeHiring);

    app.use('/api',router)

}
