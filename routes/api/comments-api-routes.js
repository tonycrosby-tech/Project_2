const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function (app) {
  app.post('/api/comments', isAuthenticated, (req, res) => {
    console.log(req.body);

    const createComment = {
      UserId: req.user.id,
      body: req.body.body,
      PostId: parseInt(req.body.postId)
    };

    db.Comments.create(createComment).then(function (dbComments) {
      res.json(dbComments);
      console.log(dbComments);
    });
  });
  app.post('/api/comments/:id', isAuthenticated, (req, res) => {
    db.Comments.update(req.body, { where: { id: req.params.id } }).then(
      function (dbComments) {
        res.json(dbComments);
      }
    );
  });
};
