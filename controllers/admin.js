const asyncHandler = require("../middlewares/asyncHandler");
const Admin = require("../models/Admin");

module.exports.createUserAdmin = asyncHandler(async (req, res, next) => {
  const { email, password, username, role, token } = req.body;

  fieldValidation(email, next);
  fieldValidation(password, next);
  fieldValidation(username, next);

  const admin = await Admin.create({
    username: username,
    email: email,
    password: password,
    token: (admin.dataValues.token = await sign(admin)),
  });

  if (admin.dataValues.password) {
    delete admin.dataValues.password;
  }

  // user.dataValues.token = await sign(user);

  admin.dataValues.bio = null;
  admin.dataValues.image = null;

  res.status(201).json({ user });
});
module.exports.loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.admin;

  fieldValidation(email, next);
  fieldValidation(password, next);

  const admin = await Admin.findOne({
    where: {
      email: email,
    },
  });

  if (!admin) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const isMatch = user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Wrong password", 401));
  }

  delete user.dataValues.password;

  admin.dataValues.token = await sign(admin);

  admin.dataValues.bio = null;
  admin.dataValues.image = null;

  res.status(200).json({ user });
});
const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};
