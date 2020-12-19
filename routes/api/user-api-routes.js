const db = require("../../models");

module.exports = function(app) {
  app.get("/api/users", function(_, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Post, db.Comments],
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: { id: req.params.id },
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
