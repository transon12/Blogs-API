const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const Category = sequelize.define("catyegories", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
