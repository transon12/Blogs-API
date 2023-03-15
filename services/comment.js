const comments = require("../models/Comment");
const users = require("../models/User");
const { get } = require("../routes/Admin");

module.exports.createComment = async (req, res, next) => {
  try {
    const comment = await comments.create({ ...req.body });
    res.status(200).json({
      status: 200,
      message: "Comment created",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

module.exports.getComment = async (req, res, next) => {
  try {
    const getComment = await comments.findAll({
      where: { BlogId: req.params.blogid },
      include: {
        model: users,
        attributes: ["username", "avatar"],
      },
    });
    res.status(200).json({
      status: 200,
      message: "successfully",
      data: getComment,
    });
    // console.log(getComment);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateComment = async (req, res, next) => {
  try {
    const updateComment = await comments.findOne({
      where: { id: req.body.id },
    });
    if (updateComment) {
      updateComment.status = req.body.status;
    }
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
    const deleteComment = await comments.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (deleteComment) {
      await deleteComment.destroy();
    }
    res.status(200).json({
      status: 200,
      message: "successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
