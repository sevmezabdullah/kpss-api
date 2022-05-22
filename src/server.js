const http = require('http');
const app = require('./app');
const config = require('./config/config');
const db = require('./services/db');
const server = http.createServer(app);
const PORT = config.PORT;

async function startServer() {
  db.connectDB(true);
  server.listen(PORT, () => {
    console.log(`Server ${PORT} üzerinde çalışmaya başladı.`.bgMagenta);
  });
}

startServer();
