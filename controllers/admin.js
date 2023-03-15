// const { admin } = require("googleapis/build/src/apis/admin");
const asyncHandler = require("../middlewares/asyncHandler");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// module.exports.createUserAdmin = asyncHandler(async (req, res, next) => {
// const { email, password, username, role, token } = req.body;

// fieldValidation(email, next);
// fieldValidation(password, next);
// fieldValidation(username, next);

// const admin = await Admin.create({
//   username: username,
//   email: email,
//   password: password,
//   token: (admin.dataValues.token = await sign(admin)),
// });

// if (admin.dataValues.password) {
//   delete admin.dataValues.password;
// }

// // user.dataValues.token = await sign(user);

// admin.dataValues.bio = null;
// admin.dataValues.image = null;

// res.status(201).json({ admin });
//   res.send("hello");
// });
// module.exports.loginAdmin = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body.admin;

//   fieldValidation(email, next);
//   fieldValidation(password, next);

//   const admin = await Admin.findOne({
//     where: {
//       email: email,
//     },
//   });

//   if (!admin) {
//     return next(new ErrorResponse(`User not found`, 404));
//   }

//   const isMatch = user.matchPassword(password);

//   if (!isMatch) {
//     return next(new ErrorResponse("Wrong password", 401));
//   }

//   delete user.dataValues.password;

//   admin.dataValues.token = await sign(admin);

//   admin.dataValues.bio = null;
//   admin.dataValues.image = null;

//   res.status(200).json({ user });
// });
// const fieldValidation = (field, next) => {
//   if (!field) {
//     return next(new ErrorResponse(`Missing fields`, 400));
//   }
// };

module.exports.createAdmin = async (req, res) => {
  try {
    const users = await Admin.create({ ...req.body });
    res.status(200).send({
      status: 200,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to insert data",
      error: error,
      status: 400,
    });
    console.log(error);
  }
};

module.exports.getAllAdmin = async (req, res) => {
  try {
    getAll = await Admin.findAll();
    res.status(200).json({
      status: 200,
      message: "successfully get All Users",
      data: getAll,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to insert data",
      error: error,
      status: 400,
    });
  }
};

module.exports.updateUserAdmin = async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, 10);
  try {
    getUser = await Admin.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (getUser) {
      getUser.username = req.body.username;
      getUser.fullname = req.body.fullname;
      getUser.google_id = req.body.google_id;
      getUser.password = hash;
      getUser.avatar = req.body.avatar;
      getUser.email = req.body.email;
      getUser.is_active = req.body.is_active;
      getUser.role = req.body.role;
      await getUser.save();
      res.status(200).json("Updated successfully!");
    } else {
      // Không tìm thấy đối tượng để cập nhật
      res.status(404).json("User not found!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUserAdmin = async (req, res, next) => {
  try {
    const deleteUser = await Admin.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (deleteUser) {
      await deleteUser.destroy();
    }
    res.status(200).json({
      status: 200,
      message: "successfully deleted",
      data: deleteUser,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const { headers } = req;
    if (!headers.authorization) return next();

    const token = headers.authorization.split(" ")[1];
    if (!token) throw new SyntaxError("Token missing or malformed");

    const userVerified = await verify(token);
    if (!userVerified) throw new Error("Invalid Token");

    req.loggedUser = await Admin.findOne({
      attributes: { exclude: ["username", "password"] },
      where: { username: userVerified.username },
    });

    if (!req.loggedUser) next(new NotFoundError("User"));

    req.loggedUser.dataValues.token = token;

    next();
  } catch (error) {
    next(error);
  }
};
