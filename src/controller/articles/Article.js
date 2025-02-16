const Sequelize = require('sequelize');
const coneciton = require('..//../databse/Conection');
const Categoria = require('../categories/category');

const Articles = coneciton.define('artcles', { 
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

});  

Categoria.hasMany(Articles); // Relacionamento 1 para N
Articles.belongsTo(Categoria); // Relacionamento 1 para 1
module.exports = Articles