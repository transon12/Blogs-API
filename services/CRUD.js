const asyncHandler = require("../middlewares/asyncHandler");
const Article = require("../models/Blogs");
const Tag = require("../models/Like");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");

// const includeOptions = [
//   {
//     model: Tag,
//     as: "tagLists",
//     attributes: ["name"],
//     through: { attributes: [] },
//   },
//   { model: User, as: "author", attributes: { exclude: ["email", "password"] } },
// ];

module.exports.createArticle = async (req, res, next) => {
  try {
    fieldValidation(req.body.title, next);
    fieldValidation(req.body.description, next);
    fieldValidation(req.body.content, next);

    const { title, description, content } = req.body;

    const article = await Article.create({ ...req.body });
    res.status(200).send({
      status: 200,
      message: "successfully created",
    });
    console.log(article);
  } catch (err) {
    console.log(err);
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
    res.status(200).send({
      status: 200,
      message: "successfully created",
      data: getAll,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getOneArticle = async (req, res, next) => {
  try {
    const getOne = await Article.findOne();
    res.status(200).send({
      status: 200,
      message: "successfully created",
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
    res.status(200).send({
      status: 200,
      message: "successfully created",
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
    res.status(200).send({
      status: 200,
      message: "successfully created",
      data: deleteArticle,
    });
  } catch (err) {
    console.log(err);
  }
};
