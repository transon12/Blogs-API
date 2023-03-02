const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");

// Import Models
const User = require("./models/User");
const Admin = require("./models/Admin");
const Settings = require("./models/Setting");
const Like = require("./models/Like");
const Comment = require("./models/Comment");
const Category = require("./models/Category");
const Blogs = require("./models/Blogs");
const Ratings = require("./models/Rating");

dotenv.config({ path: "config.env" });

const app = express();

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Route files
// const users = require("./routes/users");
// const profiles = require("./routes/profiles");
// const articles = require("./routes/articles");
// const comments = require("./routes/comments");
// const tags = require("./routes/tags");

// Mount routers
// app.use(users);
// app.use(profiles);
// app.use(articles);
// app.use(comments);
// app.use(tags);

const PORT = process.env.PORT || 8080;

app.use(errorHandler);

// Relations
//user relation blogs
User.hasMany(Blogs);
Blogs.belongsTo(User);

//admin relation blog
Admin.hasMany(Blogs);
Blogs.belongsTo(Admin);

//blog relation coment
Blogs.hasMany(Comment);
Comment.belongsTo(Blogs);

//category relation blogs
Category.hasMany(Blogs);
Blogs.belongsTo(Category);

//user relation rating
User.hasMany(Comment);
User.hasMany(Ratings);

//comment realtion rating

Comment.hasMany(Ratings);

//user relation like
User.hasMany(Like);

//like relation blogs
Like.belongsTo(Blogs);

const sync = async () => await sequelize.sync({ force: true });
sync().then(() => {
  User.create({
    email: "test@test.com",
    password: "123456",
    username: "neo",
  });
  User.create({
    email: "test2@test.com",
    password: "123456",
    username: "celeb_neo",
  });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
