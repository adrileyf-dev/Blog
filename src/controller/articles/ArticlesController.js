const express = require("express");
const router = express.Router();
const Articles = require("../articles/Article");
const Categoria = require("../categories/category");
const { default: slugify } = require("slugify");
const e = require("express");


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
  var titulo = req.body.descricao;  
  var body = req.body.body; 
  var category = req.body.category;      

  if (titulo != undefined) {
    Articles.create({
      titulo: titulo,    
      slug: slugify(titulo, { lower: true }),
      body:body,     
      categoryId:category 
      
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
    if(articles!= undefined){
      Categoria.findAll().then(categories => {
        res.render("admin/articles/edit", { categories: categories,articles:articles });
      });
       
    }else{

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
  Articles.update({ titulo: titulo, slug: slugify(titulo, { lower: true }),body:body,categoryId:category }, {
    where: {
      id: id
    }
  }).then(() => {
    res.redirect("/admin/articles");
  }).catch(error => {
    res.redirect("/admin/articles");
  });
}
);

router.get("/admin/articles/page/:num",(req,res)=>{
  var page = req.params.num;

  
     var offset = 0;
     if(isNaN(page)|| page == 1){
      offset = 0;
     }else{
      offset = parseInt(page)*4;      
     } 
   
Articles.findAndCountAll({
  limit: 4,
  offset: offset,
  include: [{ model: Categoria }]
}).then(result => {
  var next = offset + 4 < result.count;
  var response = {
    page: parseInt(page),
    next: next,
    articles: result.rows
  };
  Categoria.findAll().then(categories => {
    res.render("admin/articles/index", { response: response, categories: categories });
  });
}).catch(error => {
  res.status(500).json({ error: error.message });
});
});





/*
Nova paginação 
Articles.findAndCountAll({
  limit: 4,
  offset: offset,
  include: [{ model: Categoria }]
  }).then(result => {
  var next = offset + 4 < result.count;
  var response = {
    page: page,
    next: next,
    articles: result.rows
  };
  res.render("admin/articles/index", { response: response, categories: categories });
  }).catch(error => {
  res.status(500).json({ error: error.message });
  });
});
*/

/*
router.get("/admin/categories", (req, res) => {
  Categoria.findAll().then(categories => {
    res.render("admin/categories/index", { categories: categories }); // Passando a variável categories para a view
  });
});

router.post("/categories/delete/:id", (req, res) => {
  var id = req.params.id;
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

router.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id; 
  Categoria.findByPk(id).then(categories => {
    
    if (categories != undefined) {
      res.render("admin/categories/edit", { categories: categories });
    } else {
     // res.redirect("/admin/categories");
    }
  }).catch(error => {
   /// res.redirect("/admin/categories");
  });
});

router.post("/categories/update/:id", (req, res) => {
  var id = req.params.id; 
  var titulo = req.body.titulo;
  var dtcadastro = req.body.dtcadastro; 

  Categoria.update({ titulo: titulo, slug: slugify(titulo, { lower: true }),dtcadastro:dtcadastro }, {
    where: {
      id: id
    }
  }).then(() => {
    res.redirect("/admin/categories");
  }).catch(error => {
    res.redirect("/admin/categories");
  }); 
});
*/

module.exports = router;