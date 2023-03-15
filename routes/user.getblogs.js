const {
  getNewBlogs,
  getLikeOrDisLike,
  listComments,
  getBlogsIndividual,
  getInfoUser,
} = require("../services/user.blogs");

const router = require("express").Router();

router.get("/blogs/get-new-blogs", getNewBlogs);
router.get("/blogs/like-dislike", getLikeOrDisLike);
router.get("/blogs/list-comments", listComments);
router.get("/blogs/list-individuals/:id",getBlogsIndividual)
router.get("/blogs/list-user-info/:id", getInfoUser);

module.exports = router;
