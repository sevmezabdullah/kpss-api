require('dotenv').config({
  path: __dirname + '/config.env',
});

//! Proje içerisinde renkli konsolu kullanmak için konfigrasyon yapıldı.
const colors = require('colors');
colors.enable();
//!------------------------------------------
//! Projesinin çalışacağı PORT
const PORT = process.env.PORT;
//! Projenin bağlanacağı veritabanı adresi
const DB_ADRESS = process.env.DB_ADRESS;

module.exports = {
  PORT: PORT,
  DB_ADRESS: DB_ADRESS,
};
