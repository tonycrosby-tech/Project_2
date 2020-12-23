const isAuthenticated = require("../../config/middleware/isAuthenticated");
const db = require("../../models");

module.exports = function(app) {
  app.get("/api/users", isAuthenticated, (_, res) => {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Post, db.Comments],
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", isAuthenticated, (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      return res.json({});
    }
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    const { password, ...user } = req.user;
    res.json(user);
  });
};
