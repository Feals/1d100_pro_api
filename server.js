const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const rpgTableRoutes = require("./routes/rpgTableRoutes");
const genreRoutes = require("./routes/genreRoutes");
const authRoutes = require("./routes/authRoutes");
const configurePassport = require("./config/passportConfig");
const errorHandler = require("./middlewares/errorHandler");
const User = require("./models/Users")(sequelize);

require("./models/init-scope");

const secretKey = process.env.SECRET_KEY;
const port = process.env.PORT || 3000;
const origin = process.env.URL_ORIGIN;

const app = express();

configurePassport(User, secretKey);

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
    console.log("Connection to database successful.");

    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
