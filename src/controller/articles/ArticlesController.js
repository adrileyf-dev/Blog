const express = require("express");
const router = express.Router();
const Articles = require("../articles/Article");
const Categoria = require("../categories/category");
const { default: slugify } = require("slugify");

router.get("/admin/articles/New", (req, res) => {
  Categoria.findAll().then(categories => {
    res.render("admin/articles/New", { categories: categories });
  })
});
/*
router.get("/admin/articles", (req, res) => {
  Articles.findAll({
    include: [{ model: Categoria }] // Incluindo a tabela categorias
  }).then(articles => {
    res.render("admin/articles/index", { articles: articles }); // Passando a variável articles para a view 
  });
});   */
router.post("/articles/save", (req, res) => {
  var titulo   = req.body.descricao;
  var body     = req.body.body;
  var category = req.body.category;

  if (titulo != undefined) {
      Articles.create({
      titulo: titulo,
      slug: slugify(titulo, { lower: true }),
      body: body,
      categoryId: category

    }).then(() => {
      res.redirect("/admin/articles/New");
    })
  }
});

router.post("/articles/delete/:id", (req, res) => {
  var id = req.params.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Articles.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
 }
);

router.get("/admin/articles/edit/:id", (req, res) => {
  var id = req.params.id;
  Articles.findByPk(id).then(articles => {
    if (articles != undefined) {
      Categoria.findAll().then(categories => {
        res.render("admin/articles/edit", { categories: categories, articles: articles });
      });

    } else {

    }
  }).catch(error => {
    // res.redirect("/admin/articles");
  })
});

router.post("/articles/update/:id", (req, res) => {
  var id = req.params.id;
  var titulo = req.body.descricao;
  var body = req.body.body;
  var category = req.body.category;
  Articles.update({ titulo: titulo, slug: slugify(titulo, { lower: true }), body: body, categoryId: category }, {
    where: {
      id: id
    }
  }).then(() => {
   // res.redirect("/admin/articles");
  }).catch(error => {
   // res.redirect("/admin/articles");
  });
}
);

router.get("/admin/articles/page/:num", (req, res) => {
  var page = parseInt(req.params.num) || 1;
  var limit = 10;
  var offset = (page - 1) * limit;

  Articles.findAndCountAll({
    limit: limit,
    offset: offset,
    include: [{ model: Categoria }]
  }).then(result => {
    var totalPages = Math.ceil(result.count / limit);
    var hasNext = page < totalPages;
    var hasPrev = page > 1;

    var response = {
      page: page,
      hasNext: hasNext,
      hasPrev: hasPrev,
      totalPages: totalPages,
      articles: result.rows
    };

      Categoria.findAll().then(categories => {
      res.render("admin/articles/index", { response: response, categories: categories });
    });
  }).catch(error => {
    res.status(500).json({ error: error.message });
  });
});

module.exports = router;