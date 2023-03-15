const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
  getAllUsers,
  signUpEmail,
  loginFacebookAndGmail,
  resetPassword,
  updatePassword,
} = require("../controllers/users");
const { protect } = require("../middlewares/auth");
// router.get("/users", getAllUsers);
router.post("/users/signup", createUser);
router.post("/users/signup-with-email", signUpEmail);
router.post("/users/social/", loginFacebookAndGmail);
router.post("/users/login", loginUser);
router.post("/users/reset-password", resetPassword);
router.post("/users/update-password", updatePassword);

router.route("/user").get(protect, getCurrentUser).put(protect, updateUser);

module.exports = router;
