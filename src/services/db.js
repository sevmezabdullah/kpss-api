//! Veritabanı bağlantı ve konfigrasyonların yapılacağı db.js dosyasıdır.
const mongoose = require('mongoose');
//! Veritabanı adres bilgisini almak için config dosyasını import ediyoruz
const config = require('../config/config');

//! Veritabanına bağlanmak için oluşturulan metot
async function connectDB() {
  await mongoose.connect(config.DB_ADRESS, () => {
    console.log('Veritabanına bağlandı.'.bgMagenta);
  });
}

//! Veritabanı bağlantısının kesilmesi için yazılan metot
async function disconnectDB() {
  await mongoose.disconnect();
}

//! connectDB ve disconnectDB metotlarını export ediyoruz
module.exports = {
  connectDB,
  disconnectDB,
};
