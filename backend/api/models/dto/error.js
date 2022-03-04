const httpStatus = require('http-status');

function getTitle(code) {
  switch (code) {
    case httpStatus.BAD_REQUEST:
      return 'Invalid Request';
    case httpStatus.UPGRADE_REQUIRED:
      return 'Upgrade Required';
    case httpStatus.UNAUTHORIZED:
      return 'Invalid Access Token';
    case httpStatus.FORBIDDEN:
      return 'Invalid Permissions';
    case httpStatus.SERVICE_UNAVAILABLE:
      return 'Service Unavailable';
    case httpStatus.INTERNAL_SERVER_ERROR:
      return 'Internal Server Error';
    default:
      return 'Unknown';
  }
}

function getFallbackDescription(code) {
  switch (code) {
    case httpStatus.BAD_REQUEST:
      return 'One or multiple parameters are missing or invalid';
    case httpStatus.UPGRADE_REQUIRED:
      return 'This service requires an upgrade to TLS/1.2';
    case httpStatus.UNAUTHORIZED:
      return 'The access token is missing, invalid or has expired';
    case httpStatus.FORBIDDEN:
      return 'You do not have permissions to view this resource';
    case httpStatus.SERVICE_UNAVAILABLE:
      return 'Service Unavailable';
    case httpStatus.INTERNAL_SERVER_ERROR:
    default:
      return 'An unexpected error occurred performing this task';
  }
}

module.exports = class ApiError extends Error {
  /**
   * @param {Number} code - Custom error code
   * @param {String} [description] - API error description
   * @returns API Error Object
   */
  constructor(code, description) {
    super();
    this.statusCode = code;
    this.title = getTitle(code);
    this.description = description || getFallbackDescription(code);
  }
};
