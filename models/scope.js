const { Rpg, Genres } = require("./index");

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
    throw new Error("Erreur lors de la récupération des RPGs");
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
    throw new Error("Erreur lors de la récupération du Rpg");
  }
};

module.exports = {
  getRpgsWithGenres,
  getRpgWithGenres,
};
