const express = require("express");
const router = express.Router();
const connection = require("./../../helpers/db.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
  )
);

router.post("/signup", function (req, res, next) {
  const { nom, prénom, adresse_mail, mot_de_passe } = req.body;
  const hash = bcrypt.hashSync(mot_de_passe, 10);
  const isSame = bcrypt.compareSync("somePassword", hash);

  const sql =
    "INSERT INTO users (nom, prénom, adresse_mail, mot_de_passe) VALUES (?,?,?,?)";
  const values = [nom, prénom, adresse_mail, hash];

  connection.query(sql, values, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Une erreur s'est produite lors de l'enregistrement.",
      });
    } else {
      return res
        .status(200)
        .json({ message: "Enregistrement de votre compte réussi!" });
    }
  });
});

//Se connecter
router.post("/signin", function (req, res, next) {
  // Utilisation de Passport pour gérer l'authentification
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.nom,
        firstname: user.prénom,
        email: user.adresse_mail,
        password: user.mot_de_passe,
        inscrit: user.inscrit,
      },
      "Pauline est la plus belle"
    );
    console.log("token :", token);
    console.log("user :", user);
    return res.json({ user, token });
  })(req, res);
});

module.exports = router;
