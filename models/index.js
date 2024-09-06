const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const Rpg = require("./Rpgs")(sequelize);
const Genres = require("./Genres")(sequelize);
const RpgTables = require("./RpgTables")(sequelize);
const Users = require("./Users")(sequelize);
const RpgGenres = require("./rpgGenres")(sequelize);

module.exports = {
  sequelize,
  Rpg,
  Genres,
  RpgTables,
  Users,
  RpgGenres,
};
