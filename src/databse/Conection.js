const { Sequelize } = require('sequelize');
const DB_NAME = "blog";
const DB_USER = "admin";
const DB_PASSWORD = "admin";
const DB_HOST = "localhost"; // ou outro host
const DB_PORT = 5436; // Porta do PostgreSQL

const coneciton = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  timezone: '-03:00'
});
module.exports = coneciton;
