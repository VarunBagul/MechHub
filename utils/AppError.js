class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? 'fail'
      : 'Internal Server error';
    this.isOperational = true;

    this.stack = Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
