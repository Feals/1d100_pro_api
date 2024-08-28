const { sequelize } = require("./sequelize.config.js");
const Users = require("./models/Users.js")(sequelize);
const Rpg = require("./models/Rpg.js")(sequelize);
const RpgTables = require("./models/RpgTables.js")(sequelize);
const Genres = require("./models/Genres.js")(sequelize);

RpgTables.belongsTo(Users, { foreignKey: "author", onDelete: "CASCADE" });
RpgTables.belongsTo(Rpg, { foreignKey: "rpg_id", onDelete: "CASCADE" });

Rpg.hasMany(RpgTables, { foreignKey: "rpg_id", onDelete: "CASCADE" });
Users.hasMany(RpgTables, { foreignKey: "author", onDelete: "CASCADE" });

Rpg.belongsToMany(Genres, { through: "RpgGenres", foreignKey: "rpg_id" });
Genres.belongsToMany(Rpg, { through: "RpgGenres", foreignKey: "genre_id" });

module.exports = {
  Users,
  Rpg,
  RpgTables,
  sequelize,
};
