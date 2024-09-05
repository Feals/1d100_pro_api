const { sequelize } = require("../models");
const User = require("../models/Users")(sequelize);
const genericController = require("./genericController");

const userController = new genericController(User);

exports.getAllUsers = userController.getAll;
exports.getUserById = userController.getById;
exports.updateUser = userController.update;
exports.deleteUser = userController.delete;
