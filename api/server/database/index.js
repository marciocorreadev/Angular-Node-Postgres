const Sequelize = require("sequelize");
const dbConfig = require("./config/database");

const ItemPrecos = require("./models/ItemPrecos");

const connection = new Sequelize(dbConfig);
ItemPrecos.init(connection);

module.exports = connection;