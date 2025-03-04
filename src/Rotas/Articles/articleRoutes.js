const express = require("express");
const router = express.Router();
const ArticleController = require("../../controller/articles/ArticlesController1");

router.get("/admin/articles/New", ArticleController.renderNewArticlePage);
router.post("/articles/save", ArticleController.createArticle);
router.post("/articles/delete/:id", ArticleController.deleteArticle);
router.get("/admin/articles/edit/:id", ArticleController.renderEditArticlePage);
router.post("/articles/update/:id", ArticleController.updateArticle);
router.get("/admin/articles/page/:num", ArticleController.renderPaginatedArticles);

module.exports = router;