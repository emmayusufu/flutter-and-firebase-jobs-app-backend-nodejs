const express = require("express");
const multer = require("multer");

const router = express.Router(); // initializing the express router

// ================================================== importing authentication controllers
const {
  login,
  register,
  verifyOtp,
  setupClientProfile,
  setupWorkManProfile,
  allClients,
  allWorkmen,
  updateAccount,
} = require("../controllers/auth");

// ================================================== importing hiring controllers
const {
  getClientHirings,
  getWorkManHirings,
  hireWorkMan,
  updatehiring,
} = require("../controllers/hiring");

// ================================================== route for registering users
router.post("/register", register);

// ================================================== route for getting for logging in users
router.post("/login", login);

// ================================================== route for verifying otp
router.post("/verify_otp", verifyOtp);

// ================================================== route for setting up client profile
router.post(
  "/setup_client_profile",
  multer({ storage: multer.memoryStorage() }).single("dpImage"),
  setupClientProfile
);

// ================================================== route for setting up workman profile
router.post(
  "/setup_workman_profile",
  multer({ storage: multer.memoryStorage() }).any(),
  setupWorkManProfile
);

// ================================================== route for updating a user's profile
router.post(
  "/updateProfile/:id",
  multer({ storage: multer.memoryStorage() }).any(),
  updateAccount
);

// ================================================== route for getting all the workmen
router.get("/workmen", allWorkmen);

// ================================================== route for getting all the clients
router.get("/clients", allClients);

// ================================================== route for hiring workman
router.get("/hire/:workmanID", hireWorkMan);

// ================================================== route for getting a specific workMan's hiring
router.get("/workManHirings/:id", getWorkManHirings);

// ================================================== route for getting a specific client's hiring
router.get("/clientHirings/:id", getClientHirings);

// ================================================== route for updating a specific hiring
router.get("/updateHiring/:id", updatehiring);

module.exports = router; // exporting the express router
