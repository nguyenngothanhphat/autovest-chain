/* eslint-disable no-undef */
/* Dotenv config */
require("dotenv").config();

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  proxy: process.env.DB_PROXY || process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  // logging: logger.debug.bind(logger),
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  },
};