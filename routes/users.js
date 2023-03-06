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
} = require("../controllers/users");
const { protect } = require("../middlewares/auth");
router.get("/users", getAllUsers);
router.post("/users/signup", createUser);
router.post("/users/signup-with-email", signUpEmail);
router.post("/users/social/", loginFacebookAndGmail);
router.post("/users/login", loginUser);

router.route("/user").get(protect, getCurrentUser).put(protect, updateUser);

module.exports = router;
