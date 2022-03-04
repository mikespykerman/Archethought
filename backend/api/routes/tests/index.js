const testingRoutes = require('express').Router();
const TestingController = require('./controller');

testingRoutes
  .get('/', TestingController.getAll)
  .post('/', TestingController.createTesting)
  .get('/:testingId', TestingController.retrieveTesting)
  .put('/:testingId', TestingController.updateTesting)
  .delete('/:testingId', TestingController.deleteTesting);

module.exports = testingRoutes;