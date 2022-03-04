const deviceRoutes = require('express').Router();
const DeviceController = require('./controller');

deviceRoutes
  .get('/', DeviceController.getAll)
  .post('/', DeviceController.createDevice)
  .get('/:deviceId', DeviceController.retrieveDevice)
  .put('/:deviceId', DeviceController.updateDevice)
  .delete('/:deviceId', DeviceController.deleteDevice);

module.exports = deviceRoutes;