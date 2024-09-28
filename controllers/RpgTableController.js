const { RpgTables } = require("../models");
const GenericController = require("./genericController");
const {
  getRpgTablesWithDetails,
  getRpgTableWithDetails,
} = require("../models/scope");

class RpgTableController extends GenericController {
  constructor(model) {
    super(model);
  }

  createRpgTable = async (req, res) => {
    try {
      const { name, description, nbPlayers, rpgId, sessionDate, author } =
        req.body;
      if (
        !name ||
        !description ||
        !nbPlayers ||
        !rpgId ||
        !sessionDate ||
        !author
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const rpgTable = await this.model.create({
        name,
        description,
        nb_players: nbPlayers,
        rpg_id: rpgId,
        session_date: sessionDate,
        author,
      });

      return res.status(201).json({
        message: "La table de JDR ajoutée avec succès!",
        rpgTable,
      });
    } catch (error) {
      console.error("Error creating RPG table:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  getAllRpgTables = async (req, res) => {
    try {
      const rpgTables = await getRpgTablesWithDetails();
      return res.status(200).json(rpgTables);
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: error.message });
    }
  };

  getRpgTableById = async (req, res) => {
    try {
      const { id } = req.params;

      const rpgTable = await getRpgTableWithDetails(id);
      return res.status(200).json(rpgTable);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateRpgTable = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, nbPlayers, rpgId, sessionDate } =
        req.body.values;
      if (!name || !description || !nbPlayers || !rpgId || !sessionDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const rpgTable = await this.model.findByPk(id);
      if (!rpgTable) {
        return res.status(404).json({ message: "Table de Jdr non trouvée" });
      }

      await rpgTable.update({
        name,
        description,
        nb_players: nbPlayers,
        rpg_id: rpgId,
        session_date: sessionDate,
      });

      return res.status(200).json({
        message: "Table de Jdr mise à jour avec succès!",
        rpgTable,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la table de Jdr:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  deleteRpgTable = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      const rpgTable = await this.model.findByPk(id);
      if (!rpgTable) {
        return res.status(404).json({ message: "Table de Jdr non trouvée" });
      }

      await rpgTable.destroy();
      return res
        .status(200)
        .json({ message: "Table de Jdr supprimée avec succès!" });
    } catch (error) {
      console.error("Erreur lors de la suppression de la table de Jdr:", error);
      return res.status(500).json({ message: error.message });
    }
  };
}

const rpgTableController = new RpgTableController(RpgTables);

module.exports = {
  createRpgTable: rpgTableController.createRpgTable,
  getAllRpgTables: rpgTableController.getAllRpgTables,
  getRpgTableById: rpgTableController.getRpgTableById,
  updateRpgTable: rpgTableController.updateRpgTable,
  deleteRpgTable: rpgTableController.deleteRpgTable,
};
