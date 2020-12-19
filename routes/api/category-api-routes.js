const db = require("../../models");

module.exports = function(app) {
  app.get("/api/category", function(req, res) {
    db.Category.findAll({}).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.get("/api/category/:id", function(req, res) {
    db.Category.findAll({
      where: { id: req.params.id },
      include: [db.Post, db.User],
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.post("/api/category", function(req, res) {
    db.Category.create(req.body).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.delete("api/category/:id", function(req, res) {
    db.Category.destroy({ where: { id: req.params.id } }).then(function(
      dbCategory
    ) {
      res.json(dbCategory);
    });
  });
};
