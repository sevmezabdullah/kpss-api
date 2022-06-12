const ErrorResponse = require('../utils/error.handler');

const errorHandler = (err, request, response, next) => {
  console.log(`Hata :  ${err}`);
  return response.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Sunucu Hatası',
  });
};

module.exports = errorHandler;
