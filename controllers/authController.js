const passport = require("passport");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signup = async (req, res) => {
    try {
      const user = await this.authService.signup(req.body);
      return res.status(201).json({
        message: "Enregistrement réussi!",
        user,
      });
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  signin = (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({ message: info.message });
      }
      const token = this.authService.generateToken(user);
      return res.json({ token });
    })(req, res);
  };
}

module.exports = AuthController;
