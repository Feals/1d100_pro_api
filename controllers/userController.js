const { sequelize } = require("../models");
const User = require("../models/Users")(sequelize);
const genericController = require("./genericController");

exports.createUser = genericController.create(User);
exports.getAllUsers = genericController.getAll(User);
exports.getUserById = genericController.getById(User);
exports.updateUser = genericController.update(User);
exports.deleteUser = genericController.delete(User);
