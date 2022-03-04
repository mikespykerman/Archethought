const authenticationRoutes = require('express').Router();
const AuthenticationController = require('./controller');

authenticationRoutes
  .post('/login', AuthenticationController.login)
  .post('/requestResetPassword', AuthenticationController.requestPasswordReset)
  .post('/token', AuthenticationController.getToken)
  .post('/resetPassword', AuthenticationController.resetPassword)
  .post('/register', AuthenticationController.registerAccount)
  .post('/register/user', AuthenticationController.registerUser)
  .post('/register/confirmation',AuthenticationController.confirmAccountRegistration);

module.exports = authenticationRoutes;