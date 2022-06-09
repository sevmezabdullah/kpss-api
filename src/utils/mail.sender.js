const nodemailer = require('nodemailer');

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const { google } = require('googleapis');

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
var template = Handlebars.compile(source);
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

async function sendEmail(email, to, subject, html) {
  const transporter = configurationTranstporter();
  console.log(transporter);
  let isSent = false;

  let mailOptions = {
    from: `<${email}>`,
    to: `${to}`,
    subject: `${subject}`,
    html: template(),
  };

  (await transporter).sendMail(mailOptions, (err, result) => {
    console.log(result);
    if (err) {
      isSent = false;
    } else {
      isSent = true;
    }
  });
}

module.exports = { sendEmail };
