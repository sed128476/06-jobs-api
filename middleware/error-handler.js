//const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
 
let CustomError = {
    // set default
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later',
}  
  
 // if (err instanceof CustomAPIError) {
  //  return res.status(err.statusCode).json({ msg: err.message })
 //}
 if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
     customError.statusCode = 400
   }

  if (err.code   && err.code === 11000){
    CustomError.msg = `Duplicate Value enteredd for ${Object.keys(
      err.keyValue)} field, Please choose another value `
    CustomError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg })
  
}

module.exports = errorHandlerMiddleware
