const { sequelize } = require("../models");
const Genre = require("../models/Genres")(sequelize);
const genericController = require("./genericController");

const genreController = new genericController(Genre);

exports.createGenre = genreController.create;
exports.getAllGenres = genreController.getAll;
exports.getGenreById = genreController.getById;
exports.updateGenre = genreController.update;
exports.deleteGenre = genreController.delete;
