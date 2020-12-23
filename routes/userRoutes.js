const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  login,
  register,
  verifyOtp,
  setupClientProfile,
  setupWorkManProfile,
  users,
} = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/verify_otp", verifyOtp);

router.post(
  "/setup_client_profile",
  multer({ storage: multer.memoryStorage() }).single("dpImage"),
  setupClientProfile
);

router.post(
  "/setup_workman_profile",
  multer({ storage: multer.memoryStorage() }).any(),
  setupWorkManProfile
);

router.get("/users", users);

module.exports = router;
