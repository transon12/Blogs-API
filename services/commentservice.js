const comments = require("../models/Comment");

class CommentService {
  constructor(param) {
    this.param = param;
  }
  async findOneComment(id) {
    try {
      const comment = await comments.findOne({
        where: {
          id: this.param,
        },
      });
      if (!comment) {
        throw new ErrorResponse("Khong ton tai", 500);
      }
      return comment;
    } catch (err) {
      return err;
    }
  }

  async createdComment() {
    try {
      const comment = await comments.create(this.param);
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllComment() {
    try {
      const comment = await comments.findAll();
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
  async updateComment(id) {
    try {
      const comment = await comments.update(this.param, {
        where: {
          id: id,
        },
      });
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteComment(id) {
    try {
      const commentCurrent = await this.findOneComment();
      const comment = await comments.destroy({
        where: {
          id: id,
        },
      });
      return comment;
    } catch (err) {
      return err;
    }
  }
}

module.exports = CommentService;
