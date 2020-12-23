require("dotenv").config({
  development: {
    username: process.env.DB_USER_2,
    password: process.env.DB_PASSWORD_2,
    database: process.env.DB_NAME_2,
    host: process.env.DB_HOST_2,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER_2,
    password: process.env.DB_PASSWORD_2,
    database: process.env.DB_NAME_2,
    host: process.env.DB_HOST_2,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
});
