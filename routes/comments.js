const express = require("express");
const router = express.Router();
const comment = require("../services/comment");

router.post("/comment", comment.createComment);
router.get("/comment/:blogid", comment.getComment);
router.put("/comment/:id", comment.updateComment);
router.delete("/comment/:id", comment.createComment);

module.exports = router;
