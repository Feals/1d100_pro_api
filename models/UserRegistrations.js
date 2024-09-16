const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserRegistrations = sequelize.define(
    "UserRegistration",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      rpg_table_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      registration_date: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      tableName: "user_registrations",
    }
  );

  return UserRegistrations;
};
