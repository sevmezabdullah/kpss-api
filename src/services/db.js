//! Veritabanı bağlantı ve konfigrasyonların yapılacağı db.js dosyasıdır.
const mongoose = require('mongoose');
//! Veritabanı adres bilgisini almak için config dosyasını import ediyoruz
const config = require('../config/config');
//! Veritabanına bağlı olup olmadığımızı kontrol edebileceğimiz dbConnected değişkeni
let dbConnected;
//! Date objesi ile veritabanına bağlandığımız saat:dakika:saniye bilgisini alıyoruz.
const date = new Date();

//! Veritabanına bağlanmak için oluşturulan metot
async function connectDB() {
  await mongoose.connect(config.DB_ADRESS, () => {
    console.log(
      `Veritabanına bağlandı. : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`
        .bgMagenta
    );
    dbConnected = true;
  });
}

//! Veritabanı bağlantısının kesilmesi için yazılan metot
async function disconnectDB() {
  await mongoose.disconnect();
  dbConnected = false;
}

//! connectDB ve disconnectDB metotlarını export ediyoruz
module.exports = {
  connectDB,
  disconnectDB,
  dbConnected,
};
