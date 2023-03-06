const express = require("express");
const router = express.Router();
const { createUserAdmin, loginAdmin } = require("../controllers/admin");
const { protect } = require("../middlewares/auth");
// router.get("/users", getAllUsers);
router.get("/admin/signup", (req, res) => {
  res.send("hehehe");
  console.log("hehehe");
});

router.post("/admin/login", loginAdmin);

router.route("/user").get(protect, getCurrentUser).put(protect, updateUser);

module.exports = router;
