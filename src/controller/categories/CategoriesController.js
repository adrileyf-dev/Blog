const express = require("express");
const router = express.Router();
const Categoria = require("../categories/category");
const { default: slugify } = require("slugify");

router.get("/admin/categories/New", (req, res) => {
  res.render("admin/categories/New");
});

router.get("/categories", (req, res) => {
  res.render("admin/categories/New");
});

router.post("/categories/save", (req, res) => {
  var titulo = req.body.titulo; 
  if(titulo!= undefined){    
    Categoria.create({
      titulo: titulo,
      slug:  slugify(titulo, { lower: true })
    }).then(() => {
      res.redirect("/admin/categories/new");
    });

  }else{
    res.redirect("/");
  }
 
 // res.json({ titulo, slug });
    
}
)


module.exports = router;
// Compare this snippet from app.js:    
