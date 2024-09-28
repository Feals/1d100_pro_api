const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(UserModel, secretKey) {
    this.UserModel = UserModel;
    this.secretKey = secretKey;
  }

  async signup({ firstname, lastname, mail, password }) {
    const existingUser = await this.UserModel.findOne({
      where: { mail: mail },
    });

    if (existingUser) {
      throw new Error("L'e-mail est déjà utilisé.");
    }

    const hash = bcrypt.hashSync(password, 10);
    const user = await this.UserModel.create({
      firstname,
      lastname,
      mail,
      password: hash,
    });
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      mail: user.mail,
      registered: user.registered,
    };
  }

  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        mail: user.mail,
      },
      this.secretKey
    );
  }
}

module.exports = AuthService;
