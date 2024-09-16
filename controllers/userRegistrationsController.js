const { UserRegistrations } = require("../models");
const GenericController = require("./genericController");
const { getUserWithRegistrations } = require("../models/scope");

class UserRegistrationController extends GenericController {
  constructor(model) {
    super(model);
  }

  checkUserRegistrations = async (req, res) => {
    const userId = req.params.id;
    try {
      const { registrationDates, tableIds } = await getUserWithRegistrations(
        userId
      );

      if (registrationDates.length === 0) {
        return res.status(200).json({ registrationDates: [], tableIds: [] });
      }

      return res.status(200).json({ registrationDates, tableIds });
    } catch (error) {
      console.error("Error checking user registrations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  subscribeUserToTable = async (req, res) => {
    console.log("req.body", req.body);
    const { tableId, userId, sessionDate } = req.body;

    if (!tableId || !userId || !sessionDate) {
      return res
        .status(400)
        .json({ message: "Données manquantes dans la requête" });
    }

    try {
      const userRegistration = await this.model.create({
        user_id: userId,
        rpg_table_id: tableId,
        registration_date: sessionDate,
      });

      return res.status(201).json({
        message: "L'inscription à la table est un succès!",
        userRegistration,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription à la table:", error);
      return res.status(500).json({ message: error.message });
    }
  };
  unsubscribeUserToTable = async (req, res) => {
    console.log("req.body", req.body);
    const { tableId, userId } = req.body;

    if (!tableId || !userId) {
      return res
        .status(400)
        .json({ message: "Données manquantes dans la requête" });
    }

    try {
      const userRegistration = await this.model.findOne({
        where: {
          user_id: userId,
          rpg_table_id: tableId,
        },
      });

      if (!userRegistration) {
        return res.status(404).json({ message: "Enregistrement non trouvé" });
      }

      await this.model.destroy({
        where: {
          user_id: userId,
          rpg_table_id: tableId,
        },
      });

      return res.status(200).json({ message: "Désinscription réussie" });
    } catch (error) {
      console.error(
        "Erreur lors de la désinscription de l'utilisateur :",
        error
      );
      return res.status(500).json({ message: error.message });
    }
  };
}

const userRegistrationController = new UserRegistrationController(
  UserRegistrations
);

module.exports = {
  checkUserRegistrations: userRegistrationController.checkUserRegistrations,
  subscribeUserToTable: userRegistrationController.subscribeUserToTable,
  unsubscribeUserToTable: userRegistrationController.unsubscribeUserToTable,
};
