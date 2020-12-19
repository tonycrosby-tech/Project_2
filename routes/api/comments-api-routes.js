const db = require('../../models');

module.exports = function (app) {
  app.post('/api/comments', function (req, res) {
    db.Comments.create(req.body).then(function (dbComments) {
      res.json(dbComments);
    });
  });
  app.post('/api/comments/:id', function (req, res) {
    db.Comments.update(req.body, { where: { id: req.params.id } }).then(
      function (dbComments) {
        res.json(dbComments);
      }
    );
  });
};
