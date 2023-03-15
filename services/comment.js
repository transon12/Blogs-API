const comments = require("../models/Comment");
const users = require("../models/User");
const { get } = require("../routes/Admin");
const ErrorResponse = require("../util/errorResponse");
const CommentService = require("./commentservice");

module.exports.createComment = async (req, res, next) => {
  try {
    let comment = new CommentService(req.body);
    let a = await comment.createdComment();
    console.log(a);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

module.exports.getComment = async (req, res, next) => {
  try {
    let comment = new CommentService(req.body);
    let a = await comment.getAllComment();

    // const getComment = await comments.findAll({
    //   where: { BlogId: req.params.blogid },
    //   include: {
    //     model: users,
    //     attributes: ["username", "avatar"],
    //   },
    // });
    res.status(200).json({
      status: 200,
      message: "successfully",
      data: a,
    });
    // console.log(getComment);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateComment = async (req, res, next) => {
  try {
    const param = {
      content: req.body.content,
    };
    let comment = new CommentService(param);
    await comment.updateComment(req.params.id);

    res.status(200).json({
      status: 200,
      message: "successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    let comment = new CommentService(req.params.id);
    let a = await comment.deleteComment(req.params.id);
    if (!a) throw new ErrorResponse("Khong ton tai", 500);
    return res.status(200).json("Thanh cong");
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json(err.message);
  }
};
