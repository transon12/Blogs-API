const { getNewBlogs, getLikeOrDisLike } = require("../services/user.blogs");

const router = require("express").Router();

router.get("/blogs/get-new-blogs", getNewBlogs);
router.get("/blogs/like-dislike", getLikeOrDisLike);
module.exports = router;
