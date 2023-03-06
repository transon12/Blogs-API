const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const Ratings = sequelize.define("ratings", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  star_value: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
});
module.exports = Ratings;
