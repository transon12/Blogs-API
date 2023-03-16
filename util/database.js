const { Sequelize } = require("sequelize");
// const dotenv = require("dotenv").config();

const sequelize = new Sequelize("csdl_blogs", "root", "12345678", {
  dialect: "mysql",
  host: "127.0.0.1",
  timezone: "+07:00",
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB Connected`.cyan.underline.bold);

    // console.log(
    //   "env: ",
    //   process.env.DATABASE,
    //   process.env.HOSTNAME,
    //   process.env.PASSWORD
    // );
  } catch (error) {
    console.error("Unable to connect to the database:".red.bold, error);
  }
};

checkConnection();

module.exports = sequelize;
