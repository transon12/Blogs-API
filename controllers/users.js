const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const matchPassword = require("../models/User");
const nodemailer = require("nodemailer");
const { sign, verify } = require("../util/jwt");
const dotenv = require("dotenv");
const sendMail = require("../util/mailer");
const { Op } = require("sequelize");

// module.exports.getAllUsers = asyncHandler(async (req, res, next) => {
//   res.send("hello");
// });
//signup user
module.exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username, role, token } = req.body;

    fieldValidation(email, next);
    fieldValidation(password, next);
    fieldValidation(username, next);
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    if (user.dataValues.password) {
      delete user.dataValues.password;
    }
    user.dataValues.token = await sign(user);
    console.log(user);
    user.dataValues.bio = null;
    user.dataValues.image = null;

    res.status(200).json({ msg: "User created succesfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//signup email
module.exports.signUpEmail = asyncHandler(async (req, res, next) => {
  // const password = "123123";
  try {
    const { email, password, token } = req.body;
    console.log(email);
    fieldValidation(email, next);
    fieldValidation(password, next);
    // console.log(fieldValidation(email, next));
    console.log("email:", email);
    const user = await User.create({
      email: email,
      password: password,
    });
    // console.log(user);
    user.dataValues.token = await sign(user);
    console.log(user.dataValues.token);
    //tao ma xac thuc
    const code = Math.floor(Math.random() * 1000000);

    // //gui email
    const subject = "Xác thực đăng ký tài khoản tại đây:";
    const text = ` http://localhost:8080?token=${user.dataValues.token}}`;

    res.status(200).json({ msg: "Create successfully" });
    return await sendMail.sendMail(user.email, subject, text);
  } catch (err) {
    res.status(400).json({ msg: "Email already exist." });
  }
});

//
//
//
//login
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  // try {
  const { email, password } = req.body;
  console.log(email);
  fieldValidation(email, next);
  fieldValidation(password, next);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!email) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const isMatch = await user.matchPassword(password);
  console.log("isMath:", isMatch);
  if (!isMatch) {
    return next(new ErrorResponse("Wrong password", 401));
  }

  delete user.dataValues.password;

  user.dataValues.token = await sign(user);

  user.dataValues.bio = null;
  user.dataValues.image = null;

  res.status(200).json({ msg: "Login successfully", user });
  // res.redirect("/users");
  // }
  // catch (err) {
  //   res.status(400).json({ msg: "err" });
  // }
});

module.exports.loginFacebookAndGmail = asyncHandler(async (req, res, next) => {
  const { social_id, type } = req.body;

  const user = await User.findOne({
    where: {
      [Op.or]: [{ google_id: social_id }, { facebook_id: social_id }],
    },
  });
  // console.log("id", user);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  user.dataValues.token = await (await sign(user)).split("")[1];
  res.status(200).json({ msg: "Checking successfully", user });
});
module.exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const { loggedUser } = req;
  console.log(loggedUser);
  const user = await User.findByPk(loggedUser.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ user });
});
//
//
//reset password
module.exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user) {
    user.password = password;
    user.save();
    return res.status(200).json({ msg: "Change password successfully" });
  }
});
//
//
module.exports.updatePassword = asyncHandler(async (req, res, next) => {
  res.send("hehe");
});
//
//
module.exports.updateUser = asyncHandler(async (req, res, next) => {
  await User.update(req.body.user, {
    where: {
      id: req.user.id,
    },
  });

  const user = await User.findByPk(req.user.id);
  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ msg: "Update user successfully", user });
});

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};
