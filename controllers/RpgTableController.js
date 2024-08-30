const { sequelize } = require("../models");
const RpgTable = require("../models/RpgTables")(sequelize);
const genericController = require("./genericController");

exports.createRpgTable = genericController.create(RpgTable);
exports.getAllRpgTables = genericController.getAll(RpgTable);
exports.getRpgTableById = genericController.getById(RpgTable);
exports.updateRpgTable = genericController.update(RpgTable);
exports.deleteRpgTable = genericController.delete(RpgTable);
