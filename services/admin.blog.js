const asyncHandler = require("../middlewares/asyncHandler");
const Article = require("../models/Blogs");
const Tag = require("../models/Like");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const validate = require("../middlewares/validations.sql");

module.exports.createArticle = async (req, res, next) => {
  try {
    // fieldValidation(req.body.title, next);
    // fieldValidation(req.body.description, next);
    // fieldValidation(req.body.content, next);
    let { title } = req.body;
    let maxLengthErr = validate.maxLength(title, 255);
    let minLengthErr = validate.minLength(title, 0);

    if (maxLengthErr) {
      res.status(500).json(maxLengthErr);
    } else if (minLengthErr) {
      res.status(500).json(minLengthErr);
    } else {
      const article = await Article.create({ ...req.body });
      res.status(200).json({
        status: 200,
        message: "successfully created",
      });
      console.log(article);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};

module.exports.getAllArticle = async (req, res, next) => {
  try {
    const getAll = await Article.findAll();
    res.status(200).json({
      status: 200,
      message: "successfully get All articles",
      data: getAll,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getOneArticle = async (req, res, next) => {
  try {
    const getOne = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "successfully get One articles",
      data: getOne,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateArticle = async (req, res, next) => {
  try {
    const updateArticle = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (updateArticle) {
      updateArticle.title = req.body.title;
      updateArticle.description = req.body.description;
      updateArticle.content = req.body.content;
      await updateArticle.save();
    }
    res.status(200).json({
      status: 200,
      message: "successfully update",
      data: updateArticle,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const deleteArticle = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (deleteArticle) {
      await deleteArticle.destroy();
    }
    res.status(200).json({
      status: 200,
      message: "successfully deleted",
      data: deleteArticle,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getRecord = async (req, res, next) => {
  try {
    const limit = 10;
    const page = req.query.page || 1;
    const getRecord = await Article.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      message: "successfully",
      data: getRecord,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "error getting record",
      data: err,
    });
  }
};
