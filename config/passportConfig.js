const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");

const configurePassport = (UserModel, secretKey) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "mail",
        passwordField: "password",
        session: false,
      },
      async (mail, password, cb) => {
        try {
          const user = await UserModel.findOne({ where: { mail } });

          if (!user) {
            return cb(null, false, { message: "Adresse e-mail incorrecte." });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return cb(null, false, { message: "Mot de passe incorrect." });
          }

          return cb(null, user);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey,
      },
      (jwtPayload, cb) => {
        return cb(null, jwtPayload);
      }
    )
  );
};

module.exports = configurePassport;
