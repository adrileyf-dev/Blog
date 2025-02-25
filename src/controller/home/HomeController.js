const express = require("express");
const router = express.Router();
const Articles = require("../articles/Article");
const Categoria = require("../categories/category");  // Importa o modelo Categoria

const { default: slugify } = require("slugify");
router.get("/", (req, res) => {
  // Obtenha a categoria selecionada da URL ou de outro lugar
  const categoriaSlug = req.query.categoriaSlug; // ou algo como req.params.categoriaSlug

  // Se você estiver buscando artigos por categoria:
  let query = {};
  if (categoriaSlug) {
      query.slug = categoriaSlug; // Filtra os artigos pela categoria
  }

  // Buscar as categorias disponíveis e os artigos
  Promise.all([
      Categoria.findAll(),  // Obtém todas as categorias
      Articles.findAll({ where: query, order: ['id', 'createdAt'] }) // Buscar artigos baseados na categoria, se necessário
  ])
  .then(([categorias, articles]) => {
      // Encontrar a categoria selecionada, se houver
      const categoriaSelecionada = categorias.find(c => c.slug === categoriaSlug);

      // Renderize a página com as categorias e artigos
      res.render("home/index", { 
          articles: articles, 
          categorias: categorias, 
          categoriaSelecionada: categoriaSelecionada 
      });
  })
  .catch(error => {
      console.error(error);
      res.status(500).send("Erro ao carregar os dados.");
  });
});

module.exports = router;
