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
      console.log("rpgTables", rpgTables);
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
      console.log("rpgTable", rpgTable);
      return res.status(200).json(rpgTable);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateRpgTable = async (req, res) => {
    console.log("req", req.body);
    try {
      const { id } = req.params;
      const { name, description, nbPlayers, rpgId, sessionDate } =
        req.body.values;
      console.log("name", name);
      console.log("description", description);
      console.log("nbPlayers", nbPlayers);
      console.log("rpgId", rpgId);
      console.log("sessionDate", sessionDate);
      if (!name || !description || !nbPlayers || !rpgId || !sessionDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      console.log("test");
      const rpgTable = await this.model.findByPk(id);
      console.log("rpgTable", rpgTable);
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
      console.log("error", error);
      console.error("Erreur lors de la mise à jour de la table de Jdr:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  addUserToTable = async (rpgTableId, userId) => {
    try {
      const rpgTable = await RpgTables.findByPk(rpgTableId);

      if (!rpgTable) {
        throw new Error("Table de JDR non trouvée");
      }
      if (rpgTable.registered.includes(userId)) {
        throw new Error("L'utilisateur est déjà inscrit à cette table");
      }

      const updatedRegistered = [...rpgTable.registered, userId];

      await rpgTable.update({ registered: updatedRegistered });

      return rpgTable;
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de l'utilisateur à la table:",
        error
      );
      throw error;
    }
  };

  deleteRpgTable = async (req, res) => {
    try {
      const { id } = req.params;
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
  addUserToTable: rpgTableController.addUserToTable,
};
