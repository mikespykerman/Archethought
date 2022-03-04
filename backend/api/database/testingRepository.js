const Test = require('../../models').Test;

class TestRepository {
  async getAll() {
    const tests = await Test.findAll({ raw: true });
    return { tests, total: 1 };
  }

  async getById(id) {
    const test = await Test.findByPk(id);
    return test;
  }
  
  async create(payload) {
    const test = await Test.create(payload);
    return test;
  }

  async update(id, payload) {
    const test = await Test.update(payload, { where: { id: id }, returning: true, raw: true });
    return test[1][0];
  }

  async delete(id) {
    const test = await Test.destroy({ where: { id: id }});
    return test;
  }
}

module.exports = TestRepository;