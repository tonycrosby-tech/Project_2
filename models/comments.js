module.exports = function (sequelize, DataTypes) {
  const Comments = sequelize.define('Comments', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1] }
    }
  });

  Comments.associate = function (models) {
    Comments.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
    Comments.belongsTo(models.Post, {
      foreignKey: { allowNull: false }
    });
  };

  return Comments;
};
