const Account = require('../../models').Account;

class AccountRepository {
  /**
   * Get all accounts
   * @returns 
   */
  async getAll() {
    const accounts = await Account.findAll({ raw: true });
    return { accounts, total: 1 };
  }
  async getById(id) {
    const account = await Account.findByPk(id);
    return account;

  }
  async create(payload) {
    const newAccount = await Account.create(payload);
    return newAccount;
  }

  async update(id, payload) {
    const account = await Account.update(payload, { where: { id: id }, returning: true, raw: true });
    return account[1][0];
  }

  async delete(id) {
    const res = await Account.destroy({ where: { id: id }});
    return res;
  }
}

module.exports = AccountRepository;