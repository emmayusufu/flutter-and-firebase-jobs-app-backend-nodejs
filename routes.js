const express = require("express");
const multer = require("multer");

const router = express.Router(); // initializing the express router

// ================================================== importing authentication controllers
const {
 getUser,getUsers
} = require("./controllers/user");

const {registration} = require('./controllers/user/registration')
const {login} = require('./controllers/user/login')
const {otpVerification} = require('./controllers/user/otp_verification')

// ================================================== importing hiring controllers
const {
  getClientHirings,
  getWorkManHirings,
  hireWorkMan,
  completeHiring,
  acceptHiring,
  declineHiring,
} = require("./controllers/hiring");

router.get('/user/:userId',getUser);
router.get('/users',getUsers)
router.post("/user_registration", registration);
router.post("/user_login", login);
router.post("/otp_verification", otpVerification);

// // ================================================== route for registering users

// // ================================================== route for getting for logging in users
// router.post("/login", login);

// // ================================================== route for verifying otp
// router.post("/verify_otp", verifyOtp);

// // ================================================== route for setting up client profile
// router.post(
//   "/setup_client_profile",
//   multer({ storage: multer.memoryStorage() }).single("dpImage"),
//   setupClientProfile
// );

// // ================================================== route for setting up workman profile
// router.post(
//   "/setup_workman_profile",
//   multer({ storage: multer.memoryStorage() }).any(),
//   setupWorkManProfile
// );

// // ================================================== route for updating a user's profile
// router.post(
//   "/updateProfile/:id",
//   multer({ storage: multer.memoryStorage() }).any(),
//   updateAccount
// );

// // ================================================== route for getting all the workmen
// router.get("/workmen/:id", allWorkmen);

// // ================================================== route for getting all the clients
// router.get("/clients", allClients);

// // ================================================== route for hiring workman
// router.post("/hire/:workmanID", hireWorkMan);

// // ================================================== route for getting a specific workMan's hiring
// router.get("/workManHirings/:id", getWorkManHirings);

// // ================================================== route for getting a specific client's hiring
// router.get("/clientHirings/:id", getClientHirings);

// // ================================================== route for accepting a specific hiring
// router.post("/accept_hiring", acceptHiring);
// // ================================================== route for declining a specific hiring
// router.post("/decline_hiring", declineHiring);

// // ================================================== route for updating a specific hiring
// router.get("/complete_hiring", completeHiring);

module.exports = router; // exporting the express router

// https://792c2a13b2c4.ngrok.io
