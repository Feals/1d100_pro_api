const { sequelize } = require("../models");
const Rpg = require("../models/Rpgs")(sequelize);
const genericController = require("./genericController");

exports.createRpg = genericController.create(Rpg);
exports.getAllRpgs = genericController.getAll(Rpg);
exports.getRpgById = genericController.getById(Rpg);
exports.updateRpg = genericController.update(Rpg);
exports.deleteRpg = genericController.delete(Rpg);
