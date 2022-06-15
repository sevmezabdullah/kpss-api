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
const source = fs.readFileSync(
  path.join(__dirname, '../views/email/activation.email.handlebars'),
  'utf8'
);

const verificationTemplate = Handlebars.compile(source);

const forgotSource = fs.readFileSync(
  path.join(__dirname, '../views/email/forgot.password.handlebars'),
  'utf8'
);

const forgotPasswordEmailTemplate = Handlebars.compile(forgotSource, {
  data: { message: 'Abdullah' },
});

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

async function sendActivationEmail(email, to, userId, subject) {
  const transporter = await configurationTranstporter();

  let mailOptions = {
    from: `<${email}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: verificationTemplate(),
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}

async function sendForgotPasswordEmail(email, to, subject) {
  const transporter = configurationTranstporter();

  let mailOptions = {
    from: `<${email}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: forgotPasswordEmailTemplate(),
  };

  return (await transporter).sendMail(mailOptions);
}
module.exports = { sendActivationEmail, sendForgotPasswordEmail };
