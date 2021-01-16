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

// ================================================== end point for registering users
router.post("/register", register);

// ================================================== end point for getting for logging in users
router.post("/login", login);

// ================================================== end point for verifying otp
router.post("/verify_otp", verifyOtp);

// ================================================== end point for setting up client profile
router.post(
  "/setup_client_profile",
  multer({ storage: multer.memoryStorage() }).single("dpImage"),
  setupClientProfile
);

// ================================================== end point for setting up workman profile
router.post(
  "/setup_workman_profile",
  multer({ storage: multer.memoryStorage() }).any(),
  setupWorkManProfile
);

// ================================================== end point for updating a user's profile
router.post(
  "/updateProfile/:id",
  multer({ storage: multer.memoryStorage() }).any(),
  updateAccount
);

// ================================================== end point for getting all the workmen
router.get("/workmen", allWorkmen);

// ================================================== end point for getting all the clients
router.get("/clients", allClients);

// ================================================== end point for hiring workman
router.get("/hire/:workmanID", hireWorkMan);

// ================================================== end point for getting a specific workMan's hiring
router.get("/workManHirings/:id", getWorkManHirings);

// ================================================== end point for getting a specific client's hiring
router.get("/clientHirings/:id", getClientHirings);

// ================================================== end point for updating a specific hiring
router.get("/updateHiring/:id", updatehiring);

module.exports = router; // exporting the express router
