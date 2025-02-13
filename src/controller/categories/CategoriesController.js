const express = require("express");
const router = express.Router();
const Categoria = require("../categories/category");
const { default: slugify } = require("slugify");
const e = require("express");

router.get("/admin/categories/New", (req, res) => {
  res.render("admin/categories/New");
});

router.get("/categories", (req, res) => {
  res.render("admin/categories/New");
});
router.post("/categories/save", (req, res) => {
  var titulo = req.body.titulo;
  var dtcadastro = req.body.dtcadastro;

  if (titulo != undefined) {
    Categoria.create({
      titulo: titulo,
      dtcadastro: dtcadastro,
      slug: slugify(titulo, { lower: true })
    }).then(() => {
      res.redirect("/admin/categories/new");
    })
  }
});

router.get("/admin/categories", (req, res) => {
  Categoria.findAll().then(categories => {
    res.render("admin/categories/index", { categories: categories }); // Passando a variável categories para a view
  });
});

router.post("/categories/delete/:id", (req, res) => {
  var id = req.params.id;
  console.log(id);

  if (id != undefined) {
    if (!isNaN(id)) {
      Categoria.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/categories");
      });

    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});
module.exports = router;
// Compare this snippet from app.js: 

