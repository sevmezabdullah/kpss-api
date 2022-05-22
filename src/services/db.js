//+ Veritabanı bağlantı ve konfigrasyonların yapılacağı db.js dosyasıdır.
const mongoose = require('mongoose');
//+ Veritabanı adres bilgisini almak için config dosyasını import ediyoruz
const config = require('../config/config');

//+ Date objesi ile veritabanına bağlandığımız saat:dakika:saniye bilgisini alıyoruz.
const date = new Date();

mongoose.connection.once('open', () => {});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

//+ Veritabanına bağlanmak için oluşturulan metot
async function connectDB(isMessageOpen) {
  if (isMessageOpen) {
    await mongoose.connect(
      config.DB_ADRESS,
      { useUnifiedTopology: true },
      () => {
        console.log(
          `Veritabanına bağlandı. : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`
            .bgMagenta
        );
      }
    );
  } else {
    await mongoose.connect(config.DB_ADRESS);
  }
}

//+ Veritabanı bağlantısının kesilmesi için yazılan metot
async function disconnectDB(isMessageOpen) {
  if (isMessageOpen) {
    await mongoose.disconnect(() => {
      console.log('Veritabanı bağlantısı kesildi.'.bgRed);
    });
  } else {
    await mongoose.disconnect();
  }
}

//+ connectDB ve disconnectDB metotlarını export ediyoruz
module.exports = {
  connectDB,
  disconnectDB,
};
