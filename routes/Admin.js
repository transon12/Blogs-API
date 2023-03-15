const express = require("express");
const router = express.Router();
const usersAdmin = require("../controllers/admin");
const { protect } = require("../middlewares/auth");
const service = require("../services/admin.blog");
const category = require("../services/category");

// router.get("/users", getAllUsers);

// router.post("/admin/login", loginAdmin);

// router.route("/user").get(protect, getCurrentUser).put(protect, updateUser);

// router.get("/admin", service.getAllArticle);
router.post("/admin", service.createArticle);
router.get("/admin/:id", service.getOneArticle);
router.put("/admin/:id", service.updateArticle);
router.delete("/admin/:id", service.deleteArticle);
router.get("/admin", service.getRecord);
router.post("/admin/category", category.createcatyegories);

router.post("/admin/signup", usersAdmin.createAdmin);
router.get("/admin/users", usersAdmin.getAllAdmin);
router.put("/admin/users/:id", usersAdmin.updateUserAdmin);
router.delete("/admin/users/:id", usersAdmin.deleteUserAdmin);

router.post("/admin/signin", usersAdmin.protect);

module.exports = router;
