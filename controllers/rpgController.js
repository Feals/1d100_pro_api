const { sequelize } = require("../models");
const Rpg = require("../models/Rpgs")(sequelize);
const genericController = require("./genericController");

const rpgController = new genericController(Rpg);

exports.createRpg = rpgController.create;
exports.getAllRpgs = rpgController.getAll;
exports.getRpgById = rpgController.getById;
exports.updateRpg = rpgController.update;
exports.deleteRpg = rpgController.delete;
