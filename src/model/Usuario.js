const Sequelize = require('sequelize');
const coneciton = require('../databse/Conection');


const Usuario = coneciton.define('Usuario', { 
    User: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
   Password: {
        type: Sequelize.STRING,
        allowNull: false
    },   
    Ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },      
    
});  
 /*
Usuario.sync({force:true}).then(()=>{
    console.log("Tabela Criado com Sucesso! ")
});*/  
 //Categoria.hasMany(Articles); // Relacionamento 1 para N
 //Articles.belongsTo(Categoria); // Relacionamento 1 para 1

module.exports = Usuario;