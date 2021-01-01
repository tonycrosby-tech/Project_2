// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
const db = require('../../models');
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
    // const userEmail = _req.user.email;

    // the following code is untested!!!  I don't know that dbPost will automatically
    // reduce itself to posts, categories, users.
    db.Post.findAll({
      include: [db.User, db.Comments, db.Category],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    })
      .then(function (dbPost) {
        // const thebod = dbPost.body.Category;
        // const test2 = dbPost.Category.body;
        // const { Category, User, Comments } = dbPost;
        const postarray = [];
        const catarray = [];
        const commentarray = [];
        const userarray = [];
        const arrayall = [];
        let hbsObj = {};

        dbPost.forEach((element) => {
          postarray.push(element.dataValues);
          catarray.push(element.Category.dataValues);
          const { password, ...rest } = element.User.dataValues;
          userarray.push(rest);
          commentarray.push(element.Comments.dataValues);

          hbsObj = {
            categories: catarray,
            posts: postarray,
            comments: commentarray,
            users: userarray,
            userEmail: _req.user.email
          };

          // arrayall.push(hbsObj);
          // hbsObj = {};
        });

        // const hbsObject = {
        //   alltables: arrayall,
        //   userEmail: _req.user.email
        // };

        res.render('members', hbsObj);
      });

    // res.render('members', { userEmail });
  });

  app.get('/help', isAuthenticated, (_req, res) => {
    res.render('help', _req.user);
  });

  app.get('/forum', isAuthenticated, (_req, res) => {
    db.Category.findAll({})
      .then(function (dbCategory) {
        const catarray = [];
        for (let i = 0; i < dbCategory.length; i++) {
          const cat = dbCategory[i];
          const bod = cat.dataValues;
          catarray.push(bod);
        }

        const hbsObject = {
          categories: catarray,
          userEmail: _req.user.email
        };

        res.render('forum', hbsObject);
      });
  });

  app.get('/category', isAuthenticated, (_req, res) => {
    const catgoriesGot = privateHelperGetCats(_req);
    // db.Category.findAll({})
    //   .then(function (dbCategory) {
    //     const catarray = [];
    //     for (let i = 0; i < dbCategory.length; i++) {
    //       const cat = dbCategory[i];
    //       const bod = cat.dataValues;
    //       catarray.push(bod);
    //     }

    //     const hbsObject = {
    //       categories: catarray,
    //       userEmail: _req.user.email
    //     };

    //     res.render('category', catgoriesGot);
    //   });

    res.render('category', catgoriesGot);
  });

  app.get('/about', isAuthenticated, (_req, res) => {
    res.render('about', _req.user);
  });
  app.get('/home', isAuthenticated, (_req, res) => {
    res.render('index', _req);
  });

  app.get('/posts', isAuthenticated, (req, res) => {
    if (req.user) {
      const categoriesReceived = privateHelperGetCats();
      const hsbsObject = {
        categories: categoriesReceived,
        userEmail: req.user.email
      };

      res.render('posts', hsbsObject);
    } else {
      res.sendFile(path.join(__dirname, '../../public/login.html'));
    }
  });

  const privateHelperGetCats = (_req) => {
    db.Category.findAll({})
      .then(function (dbCategory) {
        const catarray = [];
        for (let i = 0; i < dbCategory.length; i++) {
          const cat = dbCategory[i];
          const bod = cat.dataValues;
          catarray.push(bod);
        }

        const hbsObject = {
          categories: catarray,
          userEmail: _req.user.email
        };

        return hbsObject;
      });
  };
};
