const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./config/sequelize.config");

const sequelize = new Sequelize(sequelizeConfig.development);

module.exports = sequelize;
