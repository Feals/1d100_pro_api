const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Rpg = sequelize.define(
    "Rpg",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Rpg;
};
