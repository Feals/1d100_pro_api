const express = require("express");
const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./sequelize.config");
const userRoutes = require("./routes/userRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const rpgTableRoutes = require("./routes/rpgTableRoutes");
const genreRoutes = require("./routes/genreRoutes");

const app = express();
app.use(express.json());
const port = process.env.PORT;

const sequelize = new Sequelize(sequelizeConfig.development);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connection to BDD success.");

    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server already running to the port ${port}`);
    });
  } catch (error) {
    console.error("Error connection to BDD :", error);
  }
}

app.use("/users", userRoutes);
app.use("/rpgs", rpgRoutes);
app.use("/rpgTables", rpgTableRoutes);
app.use("/genres", genreRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ flash: "Server Error" });
});

startServer();
