const nodemailer = require('nodemailer');
const config = require('../config/config');
const SMTP_SERVER = config.SMTP_SERVER;
const SMTP_EMAIL = config.SMTP_EMAIL;
const SMTP_PASSWORD = config.SMTP_PASSWORD;
const SMTP_PORT = config.SMTP_PORT;
const SMTP_HOST = config.SMTP_HOST;

let user = '';

async function configurationTranstporter() {
  const configrationParameters = {
    service: SMTP_SERVER,
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  };

  const testAccount = await nodemailer.createTestAccount();

  console.log(testAccount);
  let transporter = nodemailer.createTransport({
    host: configrationParameters.host,
    port: configrationParameters.port,
    secure: configrationParameters.secure, // true for 465, false for other ports
    auth: {
      user: configrationParameters.user, // generated ethereal user
      pass: configrationParameters.pass, // generated ethereal password
    },
  });
  user = testAccount.user;
  let mail = transporter.sendMail({
    from: 'abdullahsevmez@gmail.com',
    to: `abdullahsevmez@gmail.com`,
    subject: `konu`,
    html: `<h1></h1>`,
  });
  mail.then((info) => {
    console.log(info);
  });
  return transporter;
}

async function sendEmail(email, to, subject, html) {
  const transporter = configurationTranstporter();
}

module.exports = { sendEmail };
