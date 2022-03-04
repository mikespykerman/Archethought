const httpStatus = require('http-status');
const ApiError = require('../models/dto/error');

/** Error Service */
class ErrorService {
  static THROW_BAD_REQUEST(description = '') {
    throw new ApiError(httpStatus.BAD_REQUEST, description);
  }

  static THROW_UPGRADE_REQUIRED(description = '') {
    throw new ApiError(httpStatus.UPGRADE_REQUIRED, description);
  }

  static THROW_UNAUTHORIZED(description = '') {
    throw new ApiError(httpStatus.UNAUTHORIZED, description);
  }

  static THROW_FORBIDDEN(description = '') {
    throw new ApiError(httpStatus.FORBIDDEN, description);
  }

  static THROW_INTERNAL_SERVER_ERROR(description = '') {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, description);
  }

  static THROW_UNPROCESSABLE_ENTITY(description = '') {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, description);
  }

  static THROW_SERVICE_UNAVAILABLE(description = '') {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, description);
  }
};
module.exports = ErrorService;

