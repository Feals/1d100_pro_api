const { Users, Rpg, Genres, RpgTables, RpgGenres } = require("./index");

RpgTables.belongsTo(Users, { foreignKey: "author", onDelete: "CASCADE" });
RpgTables.belongsTo(Rpg, { foreignKey: "rpg_id", onDelete: "CASCADE" });

Rpg.hasMany(RpgTables, { foreignKey: "rpg_id", onDelete: "CASCADE" });
Users.hasMany(RpgTables, { foreignKey: "author", onDelete: "CASCADE" });

Rpg.belongsToMany(Genres, { through: RpgGenres, foreignKey: "rpg_id" });
Genres.belongsToMany(Rpg, { through: RpgGenres, foreignKey: "genre_id" });
