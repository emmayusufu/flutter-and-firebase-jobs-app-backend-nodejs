const { Sequelize } = require("sequelize");
const db = process.env.DATABASE;
const user = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;

// create connection
const sequelize = new Sequelize(db, user, password, {
  host,
  dialect: "mysql",
});

module.exports = sequelize;
