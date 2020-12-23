// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
// const router = require('express').Router();
module.exports = function (app) {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }

    res.sendFile(path.join(__dirname, '../../public/signup.html'));
  });

  // The GET function.  Come here if the window.replace function tells
  // you to.
  app.get('/loginAfterSignup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }

    res.sendFile(path.join(__dirname, '../../public/login.html'));
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/members', isAuthenticated, (_req, res) => {
    res.render('members', res);
    console.log(res);
  });
};

// module.exports = router;
