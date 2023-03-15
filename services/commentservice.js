const comments = require("../models/Comment");

class CommentService {
  constructor(param) {
    this.param = param;
  }

  async createdComment() {
    try {
      const comment = await comments.create(this.param);
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllComment(id) {
    try {
      console.log(id);
      const comment = await comments.findAll();
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CommentService;
