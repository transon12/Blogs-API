const { protect } = require("../middlewares/auth");
const { createUserAdmin, loginAdmin } = require("../controllers/admin");

module.exports = (app) => {
  const router = require("express").Router();

  router
    .post("/admin/signup", createUserAdmin)
    .post("/admin/login", loginAdmin);
  app.use(router);
};
