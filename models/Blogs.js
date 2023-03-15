const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");
// const slugify = require("slugify");
const Blogs = sequelize.define(
  "Blogs",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slugs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING(50),
      indexes: [
        {
          unique: true,
          fields: ["code"],
        },
      ],
      allowNull: true,
    },
    mode: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    date_schedule: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rank: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true }
);
// Blogs.beforeValidate((blogs) => {
//   blogs.slugs = slugify(blogs.slugs, { lower: true });
// });

module.exports = Blogs;
