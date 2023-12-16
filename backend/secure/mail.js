const nodemailer = require("nodemailer");
require("dotenv").config();

const emailSender = (content, subject, user) => {
  // console.log("called");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.adminEmail,
      pass: process.env.password,
    },
  });

  
  let mailOptions = {
    from: process.env.adminEmail,
    to: user,
    subject: subject,
    text: content,
  };
  // console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return false;
    } else {
      return true;
    }
  });
};


module.exports.emailSender = emailSender;