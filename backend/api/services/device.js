const DeviceRepository = require('../database/deviceRepository');
const DeviceDTO = require('../models/dto/device');
const ErrorService = require('./error');

/**
 * Device Service
 */
class DeviceService {
  constructor() {
    this._deviceRepository = new DeviceRepository();
  }

  async getAll() {
    const { devices, total } = await this._deviceRepository.getAll();
    return { 
      data: devices.map((a) => new DeviceDTO(a)),
      meta: {
        page: 1,
        limit: 25,
        total
      }
    };
  }
    /**
   * Get device by id
   * @param {string} id - Device id
   * @returns {Promise<DeviceDTO>}
   */
  async getDevice(id) {
    const device = await this._deviceRepository.getById(id);
    if (!device) {
      ErrorService.THROW_BAD_REQUEST("Unable to retrieve device.");
    }

    return new DeviceDTO(device);
  }

  /**
   * Create device
   * @param {object} payload - Object to create device
   * @returns {Promise<DeviceDTO>}
   */
  async createDevice(payload) {
    const device = await this._deviceRepository.create(payload);
    return new DeviceDTO(device);
  }
  /**
   * Update device
   * @param {string} id - Device id
   * @param {object} payload - Object to update device
   * @returns {Promise<DeviceDTO>}
   */
  async updateDevice(id, payload) {
    let device = await this._deviceRepository.getById(id);
    
    if (!device) {
      ErrorService.THROW_BAD_REQUEST("Unable to update device.");
    }
    const update = await this._deviceRepository.update(id, { name: payload.name });
    
    if (!update) {
      ErrorService.THROW_BAD_REQUEST("Unable to update device.");
    }

    return new DeviceDTO(update);
  }
  /**
   * Delete device
   * @param {string} id - Device id
   * @returns {Promise<DeviceDTO>}
   */
  async deleteDevice(id) {
    let device = await this._deviceRepository.getById(id);
      
    if (!device) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete device.");
    }
  
    const res = this._deviceRepository.delete(id);
    if (!res) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete device.");
    }
  
    return new DeviceDTO(res);
  }
}

module.exports = DeviceService;