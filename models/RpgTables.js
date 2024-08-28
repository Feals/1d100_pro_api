const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RpgTables = sequelize.define(
    "RpgTables",
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
      nb_player: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registered: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      rpg_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return RpgTables;
};
