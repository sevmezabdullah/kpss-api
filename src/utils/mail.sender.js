const nodemailer = require('nodemailer');
const path = require('path');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');

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

const handlebarOptions = {};
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

    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.resolve('./views'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./views'),
        extName: '.handlebars',
      })
    );
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
    template: 'email',
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
