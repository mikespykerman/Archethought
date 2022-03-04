const httpStatus = require("http-status");
const { respondWithError } = require("../../lib/request");
const AccountService = require("../../services/account");

const AdministrationController = {
  async getAccounts(req, res) {
    try {
      const accountService = new AccountService();
      const accounts = await accountService.getAll();
      return res.status(httpStatus.OK).send(accounts);
    } catch (err) {
      respondWithError(res, err);
    }
  }
};

module.exports = AdministrationController;