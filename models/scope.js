const { Rpg, Genres, RpgTables, Users, UserRegistrations } = require("./index");
const { Op, Sequelize } = require("sequelize");

const getUserWithRegistrations = async (userId) => {
  try {
    const registrations = await UserRegistrations.findAll({
      where: { user_id: userId },
      attributes: ["rpg_table_id", "registration_date"],
    });
    if (!registrations || registrations.length === 0) {
      return { registrationDates: [], tableIds: [] };
    }
    const registrationDates = registrations.map(
      (registration) => registration.registration_date
    );
    const tableIds = registrations.map(
      (registration) => registration.rpg_table_id
    );

    return { registrationDates, tableIds };
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    throw error;
  }
};

const getRpgsWithGenres = async () => {
  try {
    const rpgs = await Rpg.findAll({
      include: [
        {
          model: Genres,
          through: { attributes: [] },
        },
      ],
    });
    return rpgs;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des RPGs avec leurs genres:",
      error
    );
    throw new Error("Erreur lors de la récupération des JDRs");
  }
};

const getRpgWithGenres = async (id) => {
  try {
    if (!id) {
      throw new Error("ID du RPG est requis");
    }
    const rpg = await Rpg.findByPk(id, {
      include: [
        {
          model: Genres,
          through: { attributes: [] },
        },
      ],
    });
    return rpg;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du Rpg avec ses genres:",
      error
    );
    throw new Error("Erreur lors de la récupération du JDR");
  }
};

const getRpgTablesWithDetails = async () => {
  try {
    const tables = await RpgTables.findAll({
      include: [
        {
          model: Rpg,
          include: [
            {
              model: Genres,
              through: { attributes: [] },
            },
          ],
          attributes: ["name", "description", "images"],
        },
        {
          model: Users,
          attributes: ["firstname", "lastname"],
        },
      ],
    });

    const tablesWithUsers = await Promise.all(
      tables.map(async (table) => {
        const registrations = await UserRegistrations.findAll({
          where: { rpg_table_id: table.id },
          attributes: ["user_id"],
        });
        const userIds = registrations.map(
          (registration) => registration.user_id
        );
        const registeredUsers = await Users.findAll({
          where: { id: { [Op.in]: userIds } },
          attributes: ["id", "firstname", "lastname"],
        });
        return {
          ...table.toJSON(),
          registeredUsers: registeredUsers.map((user) => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
          })),
        };
      })
    );

    return tablesWithUsers;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tables de JDR avec les détails du JDR:",
      error
    );
    throw new Error("Erreur lors de la récupération des tables de JDR");
  }
};

const getRpgTableWithDetails = async (id) => {
  try {
    const table = await RpgTables.findByPk(id, {
      include: [
        {
          model: Rpg,
          include: [
            {
              model: Genres,
              through: { attributes: [] },
            },
          ],
          attributes: ["name", "description", "images"],
        },
        {
          model: Users,
          attributes: ["firstname", "lastname"],
        },
      ],
    });
    return table;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la table de JDR avec les détails du JDR:",
      error
    );
    throw new Error("Erreur lors de la récupération de la table de JDR");
  }
};

const checkTableCapacity = async (tableId) => {
  try {
    const registeredCount = await UserRegistrations.count({
      where: { rpg_table_id: tableId },
    });

    const table = await RpgTables.findByPk(tableId, {
      attributes: ["nb_players"],
    });

    if (!table) {
      throw new Error("Table de JDR non trouvée.");
    }

    return registeredCount < table.nb_players;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la capacité de la table:",
      error
    );
    throw error;
  }
};

module.exports = {
  getRpgsWithGenres,
  getRpgWithGenres,
  getRpgTablesWithDetails,
  getRpgTableWithDetails,
  getUserWithRegistrations,
  checkTableCapacity,
};
