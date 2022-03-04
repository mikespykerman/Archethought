const accountRoutes = require('express').Router();
const AccountController = require('./controller');

accountRoutes
  .get('/', AccountController.getAll)
  .post('/', AccountController.createAccount)
  .get('/:accountId', AccountController.retrieveAccount)
  .put('/:accountId', AccountController.updateAccount)
  .delete('/:accountId', AccountController.deleteAccount);

module.exports = accountRoutes;