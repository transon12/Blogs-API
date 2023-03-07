const express = require("express");
const router = express.Router();
const { createUserAdmin, loginAdmin } = require("../controllers/admin");
const { protect } = require("../middlewares/auth");
const service = require("../services/admin.blog");

// router.get("/users", getAllUsers);

router.post("/admin/login", loginAdmin);

// router.route("/user").get(protect, getCurrentUser).put(protect, updateUser);

// router.get("/admin", service.getAllArticle);
router.post("/admin", service.createArticle);
router.get("/admin/:id", service.getOneArticle);
router.put("/admin/:id", service.updateArticle);
router.delete("/admin/:id", service.deleteArticle);
router.get("/admin", service.getRecord);

module.exports = router;
