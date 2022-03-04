const httpStatus = require("http-status");
const AccountService = require("../../services/account");
const { respondWithError } = require("../../lib/request");

const AccountController = {
  async getAll(req, res) {
    try {
      console.log(req);
      const accountService = new AccountService();
      const accounts = await accountService.getAll();
      console.log(res);
      return res.status(httpStatus.OK).send(accounts);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async getAccount(req, res) {
    try {
      const accountService = new AccountService();
      const accounts = await accountService.getAll();
      return res.status(httpStatus.OK).send(accounts);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async createAccount(req, res) {
    try {
      const accountService = new AccountService();
      const account = await accountService.createAccount(req.body);
      return res.status(httpStatus.OK).send(account);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async retrieveAccount(req, res) {
    try {
      const { accountId } = req.params;
      const accountService = new AccountService();
      const account = await accountService.retrieveAccount(accountId);
      return res.status(httpStatus.OK).send(account);
    } catch (err) {
      console.log(err);
      respondWithError(res, err);
    }
  },

  async updateAccount(req, res) {
    try {
      const { accountId } = req.params;
      const accountService = new AccountService();
      const account = await accountService.updateAccount(accountId, req.body);
      return res.status(httpStatus.OK).send(account);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async deleteAccount(req, res) {
    try {
      const accountService = new AccountService();
      await accountService.deleteAccount(req.params.accountId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      respondWithError(res, err);
    }
  }
};

module.exports = AccountController;