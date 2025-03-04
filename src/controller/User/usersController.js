const express = require("express");
const router = express.Router();
const Usuario = require("../../model/Usuario"); // Corrigido require e caminho

// Rota para listar usuários
router.get("/admin/usuario/", (req, res) => { 
    res.send("Usuários");
});

// Rota para criar um novo usuário
router.get("/admin/usuario/create", (req, res) => {
    res.render("admin/usuario/create");
});

router.post("/admin/usuario/save", (req, res) => {
  var user      = req.body.usuario;
  var email     = req.body.email;
  var password  = req.body.password; 

  Usuario.create({
    User: user,
    Email:email,
    Password:password,
    Atiivo: true
  });

  //res.render("admin/usuario/create");
});

module.exports = router; // Corrigida a exportação
