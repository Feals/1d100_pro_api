const { Rpg, Genres, RpgTables, Users } = require("./index");
const { Op } = require("sequelize");

const getRpgsWithGenres = async () => {
  try {
    const rpgs = await Rpg.findAll({
      include: [
        {
          model: Genres,
          as: "Genres",
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
          as: "Genres",
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

    for (const table of tables) {
      if (table.registered && table.registered.length > 0) {
        const registeredUsers = await Users.findAll({
          where: {
            id: {
              [Op.in]: table.registered,
            },
          },
          attributes: ["firstname", "lastname"],
        });

        table.dataValues.registeredUsers = registeredUsers;
      } else {
        table.dataValues.registeredUsers = [];
      }
    }

    return tables;
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

module.exports = {
  getRpgsWithGenres,
  getRpgWithGenres,
  getRpgTablesWithDetails,
  getRpgTableWithDetails,
};
