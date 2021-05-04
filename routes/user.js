const router = require("express").Router();
const multer = require("multer");
const { multerFileStorage } = require("../utilities/helper_functions");

const { getUser, getUsers } = require("../controllers/user");
const { registration } = require("../controllers/user/registration");
const { login } = require("../controllers/user/login");
const { otpVerification } = require("../controllers/user/otp_verification");
const {
    setupClientProfile,
} = require("../controllers/user/setup_client_profile");
const {
    setupWorkManProfile,
} = require("../controllers/user/setup_workman_profile");

const {
    updateProfile,
} = require("../controllers/user/update_profile");

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

router.post(
  "/update_user_profile",
    multer({ storage: multerFileStorage }).any(),
  updateProfile
);


module.exports = router;