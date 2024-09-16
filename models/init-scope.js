const {
  Users,
  Rpg,
  Genres,
  RpgTables,
  RpgGenres,
  UserRegistrations,
} = require("./index");

RpgTables.belongsTo(Users, { foreignKey: "author", onDelete: "CASCADE" });
RpgTables.belongsTo(Rpg, { foreignKey: "rpg_id", onDelete: "CASCADE" });

Rpg.hasMany(RpgTables, { foreignKey: "rpg_id", onDelete: "CASCADE" });
Users.hasMany(RpgTables, { foreignKey: "author", onDelete: "CASCADE" });

Rpg.belongsToMany(Genres, { through: RpgGenres, foreignKey: "rpg_id" });
Genres.belongsToMany(Rpg, { through: RpgGenres, foreignKey: "genre_id" });

Users.belongsToMany(RpgTables, {
  through: UserRegistrations,
  foreignKey: "user_id",
  otherKey: "rpg_table_id",
});

RpgTables.belongsToMany(Users, {
  through: UserRegistrations,
  foreignKey: "rpg_table_id",
  otherKey: "user_id",
});
