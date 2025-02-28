const express = require("express");
const router = express.Router();
const Articles = require("../articles/Article");
const Categoria = require("../categories/category");  // Importa o modelo Categoria


router.get("/", (req, res) => {
  Articles.findAll(
    ).then(articles => {
    Categoria.findAll().then(categories => {
      res.render("home/index", { articles: articles, categories: categories });
    });
  });   
  });

  
// rota



router.get("/artigos/:id", (req, res) => {
  var idArticles =parseInt(req.params.id, 10);

  Articles.findByPk(idArticles).then(article => {
    if (article != undefined) {
      res.render("articles", { article: article });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/category/:id", (req, res) => {
  var categoryId = req.params.id;
  Categoria.findByPk(categoryId, {
    include: [{ model: Articles }]
  }).then(category => {
    if (category != undefined) {
      Categoria.findAll().then(categories => {
        res.render("home/index", { articles: category.articles, categories: categories });
      });
    } else {
      res.redirect("/");
    }
  }).catch(error => {
    console.error(error);
    res.redirect("/");
  });
});


module.exports = router;




// para o arquivo src/controller/home/HomeController.js
/*  
router.get("/", (req, res) => {
  // Obtenha a categoria selecionada da URL ou de outro lugar
  const idcategoria = req.query.id; // ou algo como req.params.categoriaSlug
  console.log(idcategoria);  // Verifique se a categoria foi passada corretamente
  // Se você estiver buscando artigos por categoria:
  let query = {};
  if (idcategoria) {
      query.slug = categoriaSlug; // Filtra os artigos pela categoria
  }

  // Buscar as categorias disponíveis e os artigos
  Promise.all([
      Categoria.findAll(),  // Obtém todas as categorias
      Articles.findAll({ where: query, order: ['id', 'createdAt'] }) // Buscar artigos baseados na categoria, se necessário
  ])
  .then(([categorias, articles]) => {
      // Encontrar a categoria selecionada, se houver
      //const categoriaSelecionada = categorias.find(c => c.slug === categoriaSlug);     

      // Renderize a página com as categorias e artigos
      res.render("home/index", { 
          articles: articles, 
          categorias: categorias 
        //  categoriaSelecionada: categoriaSelecionada 
      });
  })
  .catch(error => {
      console.error(error);
      res.status(500).send("Erro ao carregar os dados.");
  });
});*/
