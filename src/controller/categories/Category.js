const Sequelize = require('sequelize');

const coneciton = require('..//../databse/Conection');

const Categoria = coneciton.define('categorias', { 
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dtcadastro: {
        type: Sequelize.DATE,
        allowNull: false
    },
});  

 /*
Categoria.sync({force:true}).then(()=>{
    console.log("Tabela Criado com Sucesso! ")
}); */ 
module.exports = Categoria;
