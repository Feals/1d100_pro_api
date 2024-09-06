const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RpgGenres = sequelize.define(
    "RpgGenres",
    {
      rpg_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      tableName: "rpg_genres",
    }
  );

  return RpgGenres;
};
