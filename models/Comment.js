const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");
const User = require("./User");

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// blog_id: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },

Comment.belongsTo(User, { foreignKey: "UserId" });

module.exports = Comment;
