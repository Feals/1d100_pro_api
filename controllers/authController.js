const { sequelize } = require("../models");
const User = require("../models/Users")(sequelize);
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

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

exports.signup = async (req, res) => {
  const { firstname, lastname, mail, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      mail,
      password: hash,
    });

    return res.status(200).json({
      message: "Enregistrement de votre compte réussi!",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.mail,
        password: user.password,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de l'enregistrement.",
    });
  }
};
