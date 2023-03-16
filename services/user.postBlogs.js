const asyncHandler = require("../middlewares/asyncHandler");
const Article = require("../models/Blogs");
const Tag = require("../models/Like");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const validate = require("../middlewares/validations.sql");

class UserPostBlogs {
  async createBlogs(req, res, next) {
    try {
      //   console.log(this.params);
      let { title } = req.body;
      let maxLengthErr = validate.maxLength(title, 255);
      let minLengthErr = validate.minLength(title, 0);
      if (maxLengthErr) throw new ErrorResponse(maxLengthErr, 500);
      if (minLengthErr) throw new ErrorResponse(minLengthErr, 500);
      const article = await Article.create({ ...req.body });
      res.status(200).json({ message: "Success", article: article });
      console.log(article);
    } catch (err) {
      throw new ErrorResponse("failed", 500);
    }
    const fieldValidation = (field, next) => {
      if (!field) {
        return next(new ErrorResponse(`Missing fields`, 400));
      }
    };
  }
  async getAllArticle(req, res, next) {
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
  }
  async getOneArticle(req, res, next) {
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
  }
  async updateArticle(req, res, next) {
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
  }
  async deleteArticle(req, res, next) {
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
  }
  async getRecord(req, res, next) {
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
  }
}

module.exports = new UserPostBlogs();
