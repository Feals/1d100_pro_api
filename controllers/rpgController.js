const { Rpg, Genres } = require("../models");
const GenericController = require("./genericController");

class RpgController extends GenericController {
  constructor(model) {
    super(model);
  }

  create = async (req, res) => {
    try {
      const { name, description, genreIds } = req.body;

      let parsedGenreIds = [];
      if (typeof genreIds === "string") {
        parsedGenreIds = JSON.parse(genreIds);
      } else if (Array.isArray(genreIds)) {
        parsedGenreIds = genreIds;
      }

      if (!name || !description || !parsedGenreIds) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const file = req.file;
      const filePath = file ? file.path : null;

      const rpg = await this.model.create({
        name,
        description,
        images: filePath,
      });
      console.log("Array?", typeof parsedGenreIds);
      console.log("genreIds", parsedGenreIds);
      if (parsedGenreIds && parsedGenreIds.length > 0) {
        await Promise.all(
          parsedGenreIds.map((genreId) => rpg.addGenre(genreId))
        );
      }

      return res.status(201).json({
        message: "RPG ajouté avec succès!",
        rpg,
      });
    } catch (error) {
      console.error("Error creating RPG:", error);
      return res.status(500).json({ message: error.message });
    }
  };
}

const rpgController = new RpgController(Rpg);

exports.createRpg = rpgController.create;
exports.getAllRpgs = rpgController.getAll;
exports.getRpgById = rpgController.getById;
exports.updateRpg = rpgController.update;
exports.deleteRpg = rpgController.delete;
