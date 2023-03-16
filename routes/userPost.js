const express = require("express");
const router = express.Router();
const usersAdmin = require("../controllers/admin");
const { protect } = require("../middlewares/auth");
const {
  createBlogs,
  getAllArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
  getRecord,
} = require("../services/user.postBlogs");
const category = require("../services/category");

router.post("/users/create-blogs", createBlogs);
router.get("/users/get-all-blogs", getAllArticle);

router.get("/users/get-one-article/:id", getOneArticle);
router.put("/users/update-article/:id", updateArticle);
router.delete("/users/delete-article:id", deleteArticle);
router.get("/users/get-record", getRecord);

module.exports = router;
