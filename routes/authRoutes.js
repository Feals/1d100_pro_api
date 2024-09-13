const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");
const User = require("../models/Users")(sequelize);
const AuthController = require("../controllers/authController");
const AuthService = require("../services/authService");

const secretKey = process.env.SECRET_KEY;

const authService = new AuthService(User, secretKey);
const authController = new AuthController(authService);

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
