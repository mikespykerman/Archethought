const userRoutes = require('express').Router();
const UserController = require('./controller');

userRoutes
  .get('/', UserController.getAll)
  .get('/:userId', UserController.getUser)
  .put('/:userId', UserController.updateUser)
  .delete('/:userId', UserController.deleteUser);

module.exports = userRoutes;