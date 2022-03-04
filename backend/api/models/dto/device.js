class DeviceDTO {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.cpu = options.cpu;
    this.description = options.description;
    this.deviceId = options.deviceId;
    this.serialNumber = options.serialNumber;
    this.status = options.status;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
};

module.exports = DeviceDTO;