const { sequelize } = require("../models");

const Users = require("../models/Users")(sequelize);
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, mail, password } = req.body;
    const user = await Users.create({ firstname, lastname, mail, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
