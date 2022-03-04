const User = require('../../models').User;

class UserRepository {
  async getAll() {
    const users = await User.findAll({ raw: true });
    return { users, total: 1 };
  }

  async getById(id) {
    const user = await User.findByPk(id);
    return user;
  }
  
  async create(payload) {
    const user = await User.create(payload);
    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({ where: { email: email }});
    return user;
  }

  async update(id, payload) {
    const user = await User.update(payload, { where: { id: id }, returning: true, raw: true });
    return user[1][0];
  }

  async delete(id) {
    const user = await User.destroy({ where: { id: id }});
    return user;
  }
}

module.exports = UserRepository;