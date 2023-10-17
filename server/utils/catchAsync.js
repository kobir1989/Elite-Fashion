/**
 * A utility function to catch and handle asynchronous errors
 *
 * @param {function} fn - An asynchronous function that represents an Express route handler.
 * @returns {function} - A new function that handles asynchronous errors and passes them to the Express error handling middleware.
 */
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = catchAsync
