// const express = require("express");
// const router = express.Router();
// const {
//   getArticle,
//   getArticles,
//   createArticle,
//   articlesFeed,
//   addFavoriteArticle,
//   deleteFavoriteArticle,
//   deleteArticle,
//   updateArticle,
// } = require("../controllers/articles");
// const service = require("../services/admin.blog");
// const { protect } = require("../middlewares/auth");
// // router
// //   .route("/articles")
// //   .get(protect, getArticles)
// //   .post(protect, createArticle);
// // router.route("/articles/feed").get(protect, articlesFeed);
// // router
// //   .route("/articles/:slug")
// //   .get(protect, getArticle)
// //   .put(protect, updateArticle)
// //   .delete(protect, deleteArticle);
// // router
// //   .route("/articles/:slug/favorite")
// //   .post(prbotect, addFavoriteArticle)
// //   .delete(protect, deleteFavoriteArticle);

// // router.route("/articles/test").post(createArticle1);
// router.get("/test", service.getAllArticle);
// router.post("/test", service.createArticle);
// router.get("/test/:id", service.getOneArticle);
// router.put("/test/:id", service.updateArticle);
// router.delete("/test/:id", service.deleteArticle);

// module.exports = router;
