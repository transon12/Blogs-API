const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const Likes = sequelize.define(
  "likes",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Likes;
