const {
  getNewBlogs,
  getLikeOrDisLike,
  listComments,
} = require("../services/user.blogs");

const router = require("express").Router();

router.get("/blogs/get-new-blogs", getNewBlogs);
router.get("/blogs/like-dislike", getLikeOrDisLike);
router.get("/blogs/list-comments", listComments);
module.exports = router;
