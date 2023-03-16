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
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    // const getUser = new User("1","minhkhoa")
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
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    console.log("get", getLikeDisLike);
    res.status(200).json({ msg: "Get successfully", data: getLikeDisLike });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cannot get user like or dislike blogLists" });
  }
});
module.exports.listComments = asyncHandler(async (req, res, next) => {
  try {
    const getListComments = await Comment.findAll({
      include: [
        {
          model: Blogs,
          attributes: ["id", "title", "content"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.status(200).json({
      msg: "Get comments successfully",
      listComment: getListComments,
      // listitem: list,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cannot get user list comments" });
  }
});
module.exports.getBlogsIndividual = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const getIndividual = await Blogs.findAll({
      where: {
        UserId: id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
        {
          model: Likes,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      msg: "Get individuals successfully",
      listIndividual: getIndividual,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ msg: "Cannot get user list individuals" });
  }
});
module.exports.getInfoUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const userInfo = await User.findByPk(id, {
      include: [
        // Lấy thông tin bài viết của người dùng
        {
          model: Blogs,
          attributes: ["id", "title", "content"],
        },
        // Lấy thông tin comment của người dùng
        {
          model: Comment,
          attributes: ["id", "content"],
          include: [
            // Lấy thông tin bài viết mà người dùng đã comment
            {
              model: Blogs,
              attributes: ["id", "title"],
              // Bỏ qua các thuộc tính của bảng trung gian
            },
          ],
        },
        // Lấy thông tin like của người dùng
        {
          model: Likes,
          attributes: ["id"],
          include: [
            // Lấy thông tin bài viết mà người dùng đã like
            {
              model: Blogs,
              attributes: ["id", "title"],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      msg: "Get userInfo successfully",
      infoUser: userInfo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ msg: "Cannot get user list infoUser" });
  }
});
module.exports.getInfoUserLike = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const getInfoLikeUser = User.findAll({
      include: [
        {
          model: Blogs,
          where: { id: id },
          required: false,
          // through: { attributes: [] },
        },
        {
          model: Comment,
          required: false,
          // through: { attributes: [] },
        },
      ],
    });
    res.status(200).json({
      msg: "Get userInfoLike successfully",
      infoUser: getInfoLikeUser,
    });
  } catch (err) {
    console.log(err);
  }
});
