const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const { google } = require('googleapis');

const fs = require('fs');
const path = require('path');

const config = require('../config/config');

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const REDIRECT_URL = config.REDIRECT_URL;
const REFRESH_TOKEN = config.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// Open template file
var source = fs.readFileSync(
  path.join(__dirname, '../views/template.handlebars'),
  'utf8'
);
var verificationTemplate = Handlebars.compile(source);
async function configurationTranstporter() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'abdullahsevmez@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}

async function sendActivationEmail(email, to, subject) {
  const transporter = configurationTranstporter();
  let mailOptions = {
    from: `<${email}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: verificationTemplate(),
  };

  (await transporter).sendMail(mailOptions, (err, result) => {});
}

async function sendForgotPasswordEmail(email, to, subject) {
  const transporter = configurationTranstporter();

  let mailOptions = {
    from: `<${email}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: forgotPasswordTemplate(),
  };

  (await transporter).sendMail(mailOptions, (err, result) => {});
}
module.exports = { sendActivationEmail, sendForgotPasswordEmail };
