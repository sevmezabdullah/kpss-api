const http = require('http');
const app = require('./app');
const config = require('./config/config');
const server = http.createServer(app);
const db = require('./services/db');

const PORT = config.PORT;

async function startServer() {
  db.connectDB();
  server.listen(PORT, () => {
    console.log(`Server ${PORT} üzerinde çalışmaya başladı.`);
  });
}

startServer();
