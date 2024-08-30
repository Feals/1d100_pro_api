const { sequelize } = require("../models");
const Genre = require("../models/Genres")(sequelize);
const genericController = require("./genericController");

exports.createGenre = genericController.create(Genre);
exports.getAllGenres = genericController.getAll(Genre);
exports.getGenreById = genericController.getById(Genre);
exports.updateGenre = genericController.update(Genre);
exports.deleteGenre = genericController.delete(Genre);
