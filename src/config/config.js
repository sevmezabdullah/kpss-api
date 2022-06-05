require('dotenv').config({
  path: __dirname + '/config.env',
});

//+ Proje içerisinde renkli konsolu kullanmak için konfigrasyon yapıldı.
const colors = require('colors');
colors.enable();
//+------------------------------------------
//+ Projesinin çalışacağı PORT
const PORT = process.env.PORT;
//+ Projenin bağlanacağı veritabanı adresi
const DB_ADRESS = process.env.DB_ADRESS;

const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_PORT = process.env.SMTP_PORT;

module.exports = {
  PORT: PORT,
  DB_ADRESS: DB_ADRESS,
  SMTP_SERVER: SMTP_SERVER,
  SMTP_PASSWORD: SMTP_PASSWORD,
  SMTP_PORT: SMTP_PORT,
  SMTP_HOST: SMTP_HOST,
  SMTP_EMAIL: SMTP_EMAIL,
};
