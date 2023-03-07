const asyncHandler = require("../middlewares/asyncHandler");
const Blogs = require("../models/Blogs");
const Comment = require("../models/Comment");
const Likes = require("../models/Like");
const User = require("../models/User");
module.exports.getNewBlogs = asyncHandler(async (req, res, next) => {
  try {
    const newBlogsList = await Blogs.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Likes,
          attributes: ["user_id"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id"],
            },
          ],
        },
      ],
      order: [["user_id", "DESC"]],
    });
    res.status(200).json({ msg: "Get successfully", bloglists: newBlogsList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cannot get new blogs" });
  }
});
module.exports.getLikeOrDisLike = asyncHandler(async (req, res, next) => {
  try {
    const getLikeDisLike = await Blogs.findAll({
      include: [
        {
          model: Likes,
          attributes: ["status"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json({ msg: "Get successfully", data: getLikeDisLike });
  } catch (err) {
    res.status(500).json({ msg: "Cannot get user like or dislike blogLists" });
  }
});
