const express = require('express');
const app = express();
//+ Ayarları okuyabilmek için config.js dosyasını import ediyoruz
const config = require('./config/config');
//+ Routing işlemlerini daha rahat yapabilmek amacıyla api.js dosyası import edilir.
const api = require('./routes/api');

//+ eskiden request body sinde gelen json dosyalarını decode etmek için farklı paketlere ihtiyaç duyulur. Ancak express e gelen güncellemelerle alttaki kod ile gelen requestlerin bodylerini json olarak direk alabiliyoruz.
app.use(express.json());

//+ routing yapmak için app.use middleware metoduna apiyi parametre olarak geçiyoruz.
app.use('/api', api);

//+ proje çalıştığınde index.html dönerek ayrı bir web sayfası görüntülenmesi tavsiye edilir. Genelde landing page için kullanılan path dir.

//+ Params : []
//+ Body : []
//+ Auth : [public]
app.use('/', (request, response) => {
  return response.json({
    message: 'Server Çalışıyor!',
    PORT: config.PORT,
    Database: 'MongoDB',
  });
});

module.exports = app;
