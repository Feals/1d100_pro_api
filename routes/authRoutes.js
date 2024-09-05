const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");
const User = require("../models/Users")(sequelize);
const AuthController = require("../controllers/authController");

const secretKey = process.env.SECRET_KEY;

const authController = new AuthController(User, secretKey);

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
