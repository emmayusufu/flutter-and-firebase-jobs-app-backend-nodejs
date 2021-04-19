const express = require("express");
const multer = require("multer");
const { multerFileStorage } = require("./utilities/helper-functions");
const router = express.Router();

const { getUser, getUsers } = require("./controllers/user");

const { registration } = require("./controllers/user/registration");
const { login } = require("./controllers/user/login");
const { otpVerification } = require("./controllers/user/otp_verification");
const {
  setupClientProfile,
} = require("./controllers/user/setup_client_profile");
const {
  setupWorkManProfile,
} = require("./controllers/user/setup_workman_profile");

const {
  getClientHirings,
  getWorkManHirings,
  hireWorkMan,
  completeHiring,
  acceptHiring,
  declineHiring,
} = require("./controllers/hiring");

router.get("/user/:userId", getUser);
router.get("/users", getUsers);
router.post("/user_registration", registration);
router.post("/user_login", login);
router.post("/otp_verification", otpVerification);
router.post(
  "/setup_client_profile",
  multer({ storage: multerFileStorage }).single("profileImage"),
  setupClientProfile
);
router.post(
  "/setup_workman_profile",
  multer({ storage: multerFileStorage }).any(),
  setupWorkManProfile
);

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

module.exports = router;
