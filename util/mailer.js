const nodemailer = require("nodemailer");
const asyncHandler = require("../middlewares/asyncHandler");
const stmpTranporter = require("nodemailer-smtp-transport");
const { options } = require("../routes/users");
require("dotenv").config({ path: "config.env" });

const GMAIL_USER = "noreply_ra@rikkeisoft.com";
const GMAIL_PASS = "jugfkqcytqazbkht";
const MAILHOST = "smtp.gmail.com";
const MAILPORT = 465;
module.exports.sendMail = asyncHandler(async (to, subject, text) => {
  console.log("heheeheheh", to);
  // Tạo transporter để gửi email thông qua Gmail API
  const transporter = nodemailer.createTransport({
    host: MAILHOST,
    port: MAILPORT,
    secure: true,
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  // console.log("transport:", transporter);
  // Tạo mailOptions để định dạng email
  console.log(to);
  const mailOptions = {
    from: GMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };
  console.log("mail option", mailOptions);
  const load = await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log("sucess");
      return "hehehe";
    }
  });
  console.log("load:", load);
  return load;
});
