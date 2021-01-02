const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function (app) {
  app.post('/api/comments', isAuthenticated, (req, res) => {
    db.Comments.create(req.body).then(function (dbComments) {
      res.json(dbComments);
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
