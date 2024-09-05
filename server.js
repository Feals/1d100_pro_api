const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
const userRoutes = require("./routes/userRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const rpgTableRoutes = require("./routes/rpgTableRoutes");
const genreRoutes = require("./routes/genreRoutes");
const authRoutes = require("./routes/authRoutes");
const configurePassport = require("./config/passportConfig");
const User = require("./models/Users")(sequelize);
const errorHandler = require("./middlewares/errorHandler");

const secretKey = process.env.SECRET_KEY;
configurePassport(User, secretKey);

const app = express();
const port = process.env.PORT;
const origin = process.env.URL_ORIGIN;

app.use(express.json());
app.use(
  cors({
    origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(errorHandler);
app.use("/users", userRoutes);
app.use("/rpgs", rpgRoutes);
app.use("/rpgTables", rpgTableRoutes);
app.use("/genres", genreRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ flash: "Server Error" });
});

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

startServer();
