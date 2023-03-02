const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const Settings = sequelize.define("settings", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Settings;
