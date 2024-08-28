const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Genres = sequelize.define(
    "Genres",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Genres;
};
