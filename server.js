const express = require("express");
const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./sequelize.config");
const userRoutes = require("./routes/userRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const rpgTableRoutes = require("./routes/rpgTableRoutes");
const genreRoutes = require("./routes/genreRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(sequelizeConfig.development);

const User = require("./models/Users")(sequelize);

passport.use(
  new LocalStrategy(
    {
      usernameField: "mail",
      passwordField: "password",
      session: false,
    },
    async (mail, password, cb) => {
      try {
        const user = await User.findOne({ where: { mail: mail } });

        if (!user) {
          console.log("Adresse e-mail incorrecte.");
          return cb(null, false, { message: "Adresse e-mail incorrecte." });
        }

        // Comparer le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          console.log("Mot de passe incorrect.");
          return cb(null, false, { message: "Mot de passe incorrect." });
        }

        console.log("Connexion réussie.");
        return cb(null, user);
      } catch (err) {
        console.error("Erreur dans le bloc catch :", err);
        return cb(err);
      }
    }
  )
);

const app = express();
app.use(express.json());
const port = process.env.PORT;
const origin = process.env.URL_ORIGIN;

app.use(
  cors({
    origin: origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
app.use("/auth", authRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ flash: "Server Error" });
});

startServer();
