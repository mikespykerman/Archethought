const httpStatus = require("http-status");
const DeviceService = require("../../services/device");
const { respondWithError } = require("../../lib/request");

const DeviceController = {
  async getAll(req, res) {
    try {
      const deviceService = new DeviceService();
      const devices = await deviceService.getAll();
      return res.status(httpStatus.OK).send(devices);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async createDevice(req, res) {
    try {
      const deviceService = new DeviceService();
      const device = await deviceService.createDevice(req.body);
      return res.status(httpStatus.OK).send(device);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async retrieveDevice(req, res) {
    try {
      const { deviceId } = req.params;
      const deviceService = new DeviceService();
      const device = await deviceService.retrieveDevice(deviceId);
      return res.status(httpStatus.OK).send(device);
    } catch (err) {
      console.log(err);
      respondWithError(res, err);
    }
  },

  async updateDevice(req, res) {
    try {
      const { deviceId } = req.params;
      const deviceService = new DeviceService();
      const device = await deviceService.updateDevice(deviceId, req.body);
      return res.status(httpStatus.OK).send(device);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async deleteDevice(req, res) {
    try {
      const deviceService = new DeviceService();
      await deviceService.deleteDevice(req.params.deviceId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      respondWithError(res, err);
    }
  }
}

module.exports = DeviceController;