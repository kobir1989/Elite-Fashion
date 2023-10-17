const CustomError = require('../helper/customError')

// Db Cast error
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new CustomError(message, 400)
}
// Db Duplicate key Error
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  console.log(value)

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new CustomError(message, 400)
}
// Db Validation Error
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new CustomError(message, 400)
}

// Development erorr
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack
  })
}
// Production Error
const sendProdErorr = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })

    // Programming or other unknown error: will not leak error details to client side
  } else {
    // 1. Log error
    console.error('ERROR 💥💥', err)

    // 2. Send generic message to client
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

// Global Error Handler
module.exports = (err, _req, res, _next) => {
  console.error(err.stack)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    console.log(err, 'PROD')

    if (error.name === 'CastError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)

    sendProdErorr(error, res)
  }
}
