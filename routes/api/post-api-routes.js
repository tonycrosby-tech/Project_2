const db = require('../../models');
const passport = require('../../config/passport');

module.exports = function (app) {
  app.get('/api/posts', function (req, res) {
    db.Post.findAll({ include: [db.User, db.Comments] }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.get('/api/posts/:id', function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Comments]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post('/api/posts', function (req, res) {
    db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.delete('/api/posts/:id', function (req, res) {
    db.Post.destroy({
      where: { id: req.params.id }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.put('/api/posts', function (req, res) {
    db.Post.update(req.body, {
      where: { id: req.params.id }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If t he user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', (req, res) => {
    db.User.create(req.body)
      .then(() => {
        res.redirect(307, '/login');
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
};
