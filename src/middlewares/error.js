const ErrorResponse = require('../utils/error.handler');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(error.message);
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Tekrarlı kayıt talep ettiniz. Lütfen kontrol edin';
    error = new ErrorResponse(message, 400);
  }

  if (error.message == 'Not authorized to access this route') {
    const message = 'Erişim izniniz bulunmamaktadır';
    error = new ErrorResponse(message, 401);
  }

  // Mongoose validation error
  if (err.message === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);

    error = new ErrorResponse(message, 400);
  }
  if (
    err.message ===
    'User validation failed: email: Lütfen geçerli bir email adresi girin'
  ) {
    const message = 'Email adresi geçerli değil.';
    error = new ErrorResponse(message, 403);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
