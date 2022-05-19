require('dotenv').config({
  path: __dirname + '/config.env',
});

const PORT = process.env.PORT;
const DB_ADRESS = process.env.DB_ADRESS;

module.exports = {
  PORT: PORT,
  DB_ADRESS: DB_ADRESS,
};
