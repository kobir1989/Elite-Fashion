/********************************************************
 * @CustomError
 * @Description This class extends the built-in Error class, which allows to create error types that will have the same behavior as the built-in error types.
 * @Parameters status code, error message
 * @Return error object
 *********************************************************/

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = CustomError
