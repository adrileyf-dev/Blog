const Sequelize = require('sequelize');
const coneciton = require('..//../databse/Conection');
const Categoria = require('../categories/category');

const Articles = coneciton.define('articles', { 
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },   
    categoryId: {  // Adicionando a chave estrangeira corretamente
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Categoria, // Define a relação com a tabela "categorias"
            key: 'id'
        }
    }

});  
 /*
    Articles.sync({force:true}).then(()=>{
    console.log("Tabela Criado com Sucesso! ")
}); */
 //Categoria.hasMany(Articles); // Relacionamento 1 para N
 //Articles.belongsTo(Categoria); // Relacionamento 1 para 1

Categoria.hasMany(Articles,   { foreignKey: 'categoryId' }); // Uma categoria tem muitos artigos
Articles.belongsTo(Categoria, { foreignKey: 'categoryId' }); // Um artigo pertence a uma categoria

module.exports = Articles