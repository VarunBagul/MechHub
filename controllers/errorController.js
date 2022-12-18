const AppError = require('../utils/AppError');

// Handle Validation Error function
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((element) => element.message);
  const message = `Invalid Input data - ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle Cast Error function
const handleCastErrorDB = (err) => {
  const message = `Resource not found. Invalid ${err.id}: ${err.path}`;
  return new AppError(message, 400);
};

// Handle Duplicate Key Error function
const handleDuplicateKeyErrorDB = (err) => {
  const value = Object.keys(err.keyValue);
  const message = `Duplicate field value : ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle Wrong Jwt Error function
const handleJsonWebTokenError = () => {
  const message = `Json Web Token is invalid, Try again `;
  return new AppError(message, 400);
};

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please login again!', 401);

// Production time Error handling
const sendErrorProd = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;

  //   Handling validation Error
  if (error.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }

  //   Handling cast Error
  if (error.name === 'CastError') {
    error = handleCastErrorDB(error);
  }

  //   Handling duplicate key Error
  if (error.code === 11000) {
    error = handleDuplicateKeyErrorDB(error);
  }

  // Wrong JWT error
  if (error.name === 'JsonWebTokenError') {
    error = handleJsonWebTokenError();
  }

  // Token expired
  if (error.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  sendErrorProd(res, error);
};
