const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(UserModel, secretKey) {
    this.UserModel = UserModel;
    this.secretKey = secretKey;
  }

  async signup({ firstname, lastname, mail, password }) {
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
