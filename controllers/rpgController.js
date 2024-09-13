const { Rpg } = require("../models");
const GenericController = require("./genericController");
const { getRpgsWithGenres, getRpgWithGenres } = require("../models/scope");

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

  getAllRpgsWithGenres = async (req, res) => {
    try {
      const rpgs = await getRpgsWithGenres();
      return res.status(200).json(rpgs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getRpgWithGenres = async (req, res) => {
    try {
      const { id } = req.params;
      const rpg = await getRpgWithGenres(id);
      return res.status(200).json(rpg);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateRpg = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, genreIds } = req.body;

      let parsedGenreIds = [];
      if (typeof genreIds === "string") {
        parsedGenreIds = JSON.parse(genreIds);
      } else if (Array.isArray(genreIds)) {
        parsedGenreIds = genreIds;
      }

      if (!name || !description || !parsedGenreIds) {
        return res.status(400).json({ message: "Champ requis manquant" });
      }

      const file = req.file;
      const filePath = file ? file.path : null;

      const rpg = await this.model.findByPk(id);
      if (!rpg) {
        return res.status(404).json({ message: "RPG non trouvé" });
      }

      await rpg.update({
        name,
        description,
        images: filePath || rpg.images,
      });

      if (parsedGenreIds && parsedGenreIds.length > 0) {
        await rpg.setGenres(parsedGenreIds);
      }

      return res.status(200).json({
        message: "RPG mis à jour avec succès!",
        rpg,
      });
    } catch (error) {
      console.error("Erreur mise à jours RPG:", error);
      return res.status(500).json({ message: error.message });
    }
  };
}

const rpgController = new RpgController(Rpg);

exports.createRpg = rpgController.create;
exports.getAllRpgsWithGenres = rpgController.getAllRpgsWithGenres;
exports.getRpgById = rpgController.getRpgWithGenres;
exports.updateRpg = rpgController.updateRpg;
exports.deleteRpg = rpgController.delete;
