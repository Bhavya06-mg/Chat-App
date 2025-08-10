const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/usercontrollers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);
//router.post("/login", authUser);

module.exports = router;