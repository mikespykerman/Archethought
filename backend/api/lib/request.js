const httpStatus = require('http-status');
const ApiError = require('../models/dto/error');

const RequestUtil = {
  getAccountInfo(user) {
    console.log('request.js');
    console.log(user);
    return {
      uid: user.id,
    };
  },

  respondWithError(res, err) {
    let error;
    
    if (err instanceof ApiError) {
      error = err;
    } else {
      error = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    res.status(error.statusCode).send({ error });
  },
};

module.exports = RequestUtil;