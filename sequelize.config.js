require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "1d100_pro",
    host: "localhost",
    dialect: "mysql",
    logging: console.log,
  },
};
