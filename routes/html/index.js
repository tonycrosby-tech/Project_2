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

    db.Post.findAll({
      include: [db.User, db.Category, db.Comments],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const alltabs = [];
      let hbsObj = {};

      dbPost.forEach((element) => {
        hbsObj = {
          title: element.dataValues.title,
          body: element.dataValues.body,
          bodyCreatedAt: element.dataValues.createdAt,
          name: element.Category.dataValues.name,
          bodyUpdatedAt: element.dataValues.updatedAt,
          categories: element.dataValues.name,
          id: element.dataValues.id,
          author: element.User.dataValues.email
        };

        alltabs.push(hbsObj);
      });

      const sendObject = {
        postinfo: alltabs,
        userEmail: _req.user.email
      };

      res.render('members', sendObject);
    });
  });

  app.get('/forum', isAuthenticated, (_req, res) => {
    db.Category.findAll({}).then(function (dbCategory) {
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

  // app.get("/forum/category", isAuthenticated, (_req, res) => {
  //   const catgoriesGot = privateHelperGetCats(_req);
  //   // db.Category.findAll({})
  //   //   .then(function (dbCategory) {
  //   //     const catarray = [];
  //   //     for (let i = 0; i < dbCategory.length; i++) {
  //   //       const cat = dbCategory[i];
  //   //       const bod = cat.dataValues;
  //   //       catarray.push(bod);
  //   //     }

  //   //     const hbsObject = {
  //   //       categories: catarray,
  //   //       userEmail: _req.user.email
  //   //     };

  //   //     res.render('category', catgoriesGot);
  //   //   });

  //   res.render("category", catgoriesGot);
  // });

  app.get('/about', isAuthenticated, (_req, res) => {
    const hbsObject = {
      userEmail: _req.user.email
    };
    res.render('about', hbsObject);
  });

  app.get('/help', isAuthenticated, (_req, res) => {
    const hbsObject = {
      userEmail: _req.user.email
    };
    res.render('help', hbsObject);
  });

  app.get('/home', isAuthenticated, (_req, res) => {
    res.render('index', _req);
  });

  app.get('/forum/posts', isAuthenticated, (req, res) => {
    if (req.user) {
      db.Category.findAll({}).then(function (dbCategory) {
        const catarray = [];
        for (let i = 0; i < dbCategory.length; i++) {
          const cat = dbCategory[i];
          const bod = cat.dataValues;
          catarray.push(bod);
        }

        const hbsObject = {
          categories: catarray,
          userEmail: req.user.email
        };

        console.log(hbsObject);

        res.render('posts', hbsObject);
      });
    } else {
      res.sendFile(path.join(__dirname, '../../public/login.html'));
    }
  });

  app.get('/forum/category/Sports', isAuthenticated, (_req, res) => {
    db.Post.findAll({
      include: [db.User, db.Category, db.Comments],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const alltabs = [];
      let hbsObj = {};

      dbPost.forEach((element) => {
        if (element.Category.dataValues.name === 'Sports') {
          hbsObj = {
            title: element.dataValues.title,
            body: element.dataValues.body,
            bodyCreatedAt: element.dataValues.createdAt,
            name: element.Category.dataValues.name,
            bodyUpdatedAt: element.dataValues.updatedAt,
            userEmail: element.User.dataValues.email,
            id: element.dataValues.id,
            author: element.User.dataValues.email
          };

          alltabs.push(hbsObj);
        }
      });

      const sendObject = {
        postinfo: alltabs,
        userEmail: _req.user.email
      };
      res.render('sports', sendObject);
    });
  });
  app.get('/forum/category/Movies', isAuthenticated, (_req, res) => {
    db.Post.findAll({
      include: [db.User, db.Category, db.Comments],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const alltabs = [];
      let hbsObj = {};

      dbPost.forEach((element) => {
        if (element.Category.dataValues.name === 'Movies') {
          hbsObj = {
            title: element.dataValues.title,
            body: element.dataValues.body,
            bodyCreatedAt: element.dataValues.createdAt,
            name: element.Category.dataValues.name,
            bodyUpdatedAt: element.dataValues.updatedAt,
            userEmail: element.User.dataValues.email,
            id: element.dataValues.id,
            author: element.User.dataValues.email
          };

          alltabs.push(hbsObj);
        }
      });

      const sendObject = {
        postinfo: alltabs,
        userEmail: _req.user.email
      };
      res.render('movies', sendObject);
    });
  });
  app.get('/forum/category/Books', isAuthenticated, (_req, res) => {
    db.Post.findAll({
      include: [db.User, db.Category, db.Comments],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const alltabs = [];
      let hbsObj = {};

      dbPost.forEach((element) => {
        if (element.Category.dataValues.name === 'Books') {
          hbsObj = {
            title: element.dataValues.title,
            body: element.dataValues.body,
            bodyCreatedAt: element.dataValues.createdAt,
            name: element.Category.dataValues.name,
            bodyUpdatedAt: element.dataValues.updatedAt,
            userEmail: element.User.dataValues.email,
            id: element.dataValues.id,
            author: element.User.dataValues.email
          };

          alltabs.push(hbsObj);
        }
      });

      const sendObject = {
        postinfo: alltabs,
        userEmail: _req.user.email
      };
      res.render('books', sendObject);
    });
  });
  app.get('/forum/category/other', isAuthenticated, (_req, res) => {
    db.Post.findAll({
      include: [db.User, db.Category, db.Comments],
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const alltabs = [];
      let hbsObj = {};

      dbPost.forEach((element) => {
        if (element.Category.dataValues.name === 'Other') {
          hbsObj = {
            title: element.dataValues.title,
            body: element.dataValues.body,
            bodyCreatedAt: element.dataValues.createdAt,
            name: element.Category.dataValues.name,
            bodyUpdatedAt: element.dataValues.updatedAt,
            userEmail: element.User.dataValues.email,
            id: element.dataValues.id,
            author: element.User.dataValues.email
          };

          alltabs.push(hbsObj);
        }
      });

      const sendObject = {
        postinfo: alltabs,
        userEmail: _req.user.email
      };

      res.render('other', sendObject);
    });
  });

  app.get('/forum/category/other/:id', isAuthenticated, (_req, res) => {
    db.Post.findOne({
      include: [db.User, db.Category, db.Comments],
      where: { id: _req.params.id },
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const allComments = [];
      const info = [];

      dbPost.Comments.forEach((element) => {
        const hbssObj = {
          author: _req.user.email,
          body: element.dataValues.body
        };

        allComments.push(hbssObj);
      });

      const hbsObj = {
        title: dbPost.dataValues.title,
        body: dbPost.dataValues.body,
        bodyCreatedAt: dbPost.dataValues.createdAt,
        name: dbPost.Category.dataValues.name,
        author: dbPost.User.dataValues.email,
        userEmail: _req.user.email,
        postId: dbPost.dataValues.id
      };

      info.push(hbsObj);

      const sendobj = {
        Comments: allComments,
        postInfo: info
      };

      console.log(sendobj);

      res.render('single-post', sendobj);
    });
  });
  app.get('/forum/category/sports/:id', isAuthenticated, (_req, res) => {
    db.Post.findOne({
      include: [db.User, db.Category, db.Comments],
      where: { id: _req.params.id },
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const allComments = [];
      const info = [];

      dbPost.Comments.forEach((element) => {
        const hbssObj = {
          author: _req.user.email,
          body: element.dataValues.body
        };

        allComments.push(hbssObj);
      });

      const hbsObj = {
        title: dbPost.dataValues.title,
        body: dbPost.dataValues.body,
        bodyCreatedAt: dbPost.dataValues.createdAt,
        name: dbPost.Category.dataValues.name,
        author: dbPost.User.dataValues.email,
        userEmail: _req.user.email,
        postId: dbPost.dataValues.id
      };

      info.push(hbsObj);

      const sendobj = {
        Comments: allComments,
        postInfo: info
      };

      console.log(sendobj);

      res.render('single-post', sendobj);
    });
  });
  app.get('/forum/category/movies/:id', isAuthenticated, (_req, res) => {
    db.Post.findOne({
      include: [db.User, db.Category, db.Comments],
      where: { id: _req.params.id },
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      const allComments = [];
      const info = [];

      dbPost.Comments.forEach((element) => {
        const hbssObj = {
          author: _req.user.email,
          body: element.dataValues.body
        };

        allComments.push(hbssObj);
      });

      const hbsObj = {
        title: dbPost.dataValues.title,
        body: dbPost.dataValues.body,
        bodyCreatedAt: dbPost.dataValues.createdAt,
        name: dbPost.Category.dataValues.name,
        author: dbPost.User.dataValues.email,
        userEmail: _req.user.email,
        postId: dbPost.dataValues.id
      };

      info.push(hbsObj);

      const sendobj = {
        Comments: allComments,
        postInfo: info
      };

      console.log(sendobj);

      res.render('single-post', sendobj);
    });
  });
  app.get('/forum/category/books/:id', isAuthenticated, (_req, res) => {
    db.Post.findOne({
      include: [db.User, db.Category, db.Comments],
      where: { id: _req.params.id },
      limit: 10,
      order: [[db.sequelize.col('updatedAt'), 'DESC']]
    }).then(function (dbPost) {
      console.log(dbPost.Comments.dataValues);

      const allComments = [];
      const info = [];

      dbPost.Comments.forEach((element) => {
        const hbssObj = {
          author: _req.user.email,
          body: element.dataValues.body
        };

        allComments.push(hbssObj);
      });

      const hbsObj = {
        title: dbPost.dataValues.title,
        body: dbPost.dataValues.body,
        bodyCreatedAt: dbPost.dataValues.createdAt,
        name: dbPost.Category.dataValues.name,
        author: dbPost.User.dataValues.email,
        userEmail: _req.user.email,
        postId: dbPost.dataValues.id
      };

      info.push(hbsObj);

      const sendobj = {
        Comments: allComments,
        postInfo: info
      };

      console.log(sendobj);

      res.render('single-post', sendobj);
    });
  });

  app.use(function (req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
};
