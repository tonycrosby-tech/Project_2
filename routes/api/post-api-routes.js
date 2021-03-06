const db = require('../../models');
const passport = require('../../config/passport');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function (app) {
  app.get('/api/posts', isAuthenticated, (req, res) => {
    db.Post.findAll({ include: [db.User, db.Comments] }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.get('/api/posts/:id', isAuthenticated, (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Comments]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post('/api/posts', isAuthenticated, (req, res) => {
    const intcat = parseInt(req.body.CategoryId);

    const createpost = {
      UserId: req.user.id,
      title: req.body.title,
      body: req.body.body,
      CategoryId: intcat
    };

    console.log(createpost);

    db.Post.create(createpost).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.delete('/api/posts/:id', isAuthenticated, (req, res) => {
    db.Post.destroy({
      where: { id: req.params.id }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.put('/api/posts', isAuthenticated, (req, res) => {
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
        res.redirect(307, '/loginAfterSignup'); // this goes to the app.post
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for redirecting user to login page as opposed to getting in to
  // the system directly.  A lot of websites do this.
  app.post('/loginAfterSignup', passport.authenticate('local'), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id,
      toLogin: true
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
