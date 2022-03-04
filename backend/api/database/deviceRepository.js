const Device = require('../../models').Device;

class DeviceRepository {
  async getAll() {
    const devices = await Device.findAll({ raw: true });
    return { devices, total: 1 };
  }

  async getById(id) {
    const device = await Device.findByPk(id);
    return device;
  }
  
  async create(payload) {
    const device = await Device.create(payload);
    return device;
  }

  async update(id, payload) {
    const device = await Device.update(payload, { where: { id: id }, returning: true, raw: true });
    return device[1][0];
  }

  async delete(id) {
    const device = await Device.destroy({ where: { id: id }});
    return device;
  }
}

module.exports = DeviceRepository;