const express = require("express");
const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./sequelize.config");
const userRoutes = require("./routes/userRoutes");

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

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ flash: "Server Error" });
});

startServer();
