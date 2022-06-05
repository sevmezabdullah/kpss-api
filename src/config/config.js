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

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

module.exports = {
  PORT: PORT,
  DB_ADRESS: DB_ADRESS,
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  REDIRECT_URL: REDIRECT_URL,
  REFRESH_TOKEN: REFRESH_TOKEN,
};
