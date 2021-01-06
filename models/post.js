module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1, 35] }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1, 500] }
    }
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    });
    Post.belongsTo(models.Category, {
      foreignKey: { allowNull: false }
    });
    Post.hasMany(models.Comments, {});
  };

  return Post;
};
