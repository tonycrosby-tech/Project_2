const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.js"))[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[
      (config.production.database,
      config.production.username,
      config.production.password,
      config)
    ]
  );
} else {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) => file.includes(".") && file !== basename && file.endsWith(".js")
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
