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
      nb_players: {
        type: DataTypes.INTEGER,
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
      session_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "rpg_tables",
      timestamps: true,
      scopes: {
        withAvailableCapacity: (rpgTableId) => ({
          where: {
            id: rpgTableId,
            [sequelize.Op.and]: [
              sequelize.where(
                sequelize.fn("array_length", sequelize.col("registered"), 1),
                {
                  [sequelize.Op.lt]: sequelize.col("nb_players"),
                }
              ),
            ],
          },
        }),
      },
    }
  );

  return RpgTables;
};
