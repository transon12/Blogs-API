const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");

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
// console.log(process.env.HOSTNAME);
// Body parser
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// console.log("server:", process.env.NODE_ENV);

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
const admin = require("./routes/Admin");
const users = require("./routes/users");
const getBlogs = require("./routes/user.getblogs");
// const articles = require("./routes/articles");
const comments = require("./routes/comments");
const postBlogs = require("./routes/userPost");
// const tags = require("./routes/tags");

// Mount routers
app.use(admin);
app.use(users);
app.use(getBlogs);
app.use(postBlogs);
// app.use(profiles);
// app.use("/", articles);
app.use(comments);
// app.use(tags);

const PORT = 8080;

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
Comment.belongsTo(User);
//
User.hasMany(Ratings);
Ratings.belongsTo(User);

//comment realtion rating

Comment.hasMany(Ratings);
Ratings.belongsTo(Comment);

//user relation like
User.hasMany(Like);
Like.belongsTo(User);

//like relation blogs
Blogs.hasMany(Like);
Like.belongsTo(Blogs);

sequelize.sync();

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
