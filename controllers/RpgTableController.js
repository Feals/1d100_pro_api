const { sequelize } = require("../models");
const RpgTable = require("../models/RpgTables")(sequelize);
const genericController = require("./genericController");

const RpgTableController = new genericController(RpgTable);

exports.createRpgTable = RpgTableController.create;
exports.getAllRpgTables = RpgTableController.getAll;
exports.getRpgTableById = RpgTableController.getById;
exports.updateRpgTable = RpgTableController.update;
exports.deleteRpgTable = RpgTableController.delete;
