const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const nodemailer = require("nodemailer");
const { sign } = require("../util/jwt");
const dotenv = require("dotenv");
const { sendMail } = require("../util/mailer");

module.exports.getAllUsers = asyncHandler(async (req, res, next) => {
  res.send("hello");
});
//signup user
module.exports.createUser = asyncHandler(async (req, res, next) => {
  const { email, password, username, role, token } = req.body;

  fieldValidation(email, next);
  fieldValidation(password, next);
  fieldValidation(username, next);

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    token: (user.dataValues.token = await sign(user)),
  });

  if (user.dataValues.password) {
    delete user.dataValues.password;
  }

  user.dataValues.bio = null;
  user.dataValues.image = null;

  res.status(201).json({ user });
});
//signup email
module.exports.signUpEmail = asyncHandler(async (req, res) => {
  const password = "123123";
  const { email } = req.body;

  // fieldValidation(email, next);
  // fieldValidation(password, next);
  // console.log("email:", email);
  const user = await User.create({
    email: email,
    password: password,
  });

  //tao ma xac thuc
  const code = Math.floor(Math.random() * 10000);
  // //gui email
  const subject = "Mã xác thực đăng ký tài khoản";
  const text = `Mã xác thực của bạn là: ${code}`;
  return await sendMail(user.email, subject, text);
  // if (sent) return code;
  console.log("user:", user);
});
//
//
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.user;

  fieldValidation(email, next);
  fieldValidation(password, next);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const isMatch = user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Wrong password", 401));
  }

  delete user.dataValues.password;

  user.dataValues.token = await sign(user);

  user.dataValues.bio = null;
  user.dataValues.image = null;

  res.status(200).json({ user });
});

module.exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const { loggedUser } = req;
  const user = await User.findByPk(loggedUser.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ user });
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
  await User.update(req.body.user, {
    where: {
      id: req.user.id,
    },
  });

  const user = await User.findByPk(req.user.id);
  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ user });
});

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};
