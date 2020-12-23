const db = require("../../models");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/api/category", isAuthenticated, (req, res) => {
    db.Category.findAll({}).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.get("/api/category/:id", isAuthenticated, (req, res) => {
    db.Category.findAll({
      where: { id: req.params.id },
      include: [db.Post, db.User],
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.post("/api/category", isAuthenticated, (req, res) => {
    db.Category.create(req.body).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.delete("api/category/:id", isAuthenticated, (req, res) => {
    db.Category.destroy({ where: { id: req.params.id } }).then(function(
      dbCategory
    ) {
      res.json(dbCategory);
    });
  });
};
