const httpStatus = require("http-status");
const UserService = require("../../services/user");
const { respondWithError } = require("../../lib/request");

const UserController = {
  async getAll(req, res) {
    try {
      const userService = new UserService();
      const users = await userService.getAll();
      return res.status(httpStatus.OK).send(users);
    } catch (err) {
      respondWithError(res, err);
    }
  },
  async getUser(req, res) {
    try {
      const userService = new UserService();
      const user = await userService.getUser();
      return res.status(httpStatus.OK).send(user);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const userService = new UserService();
      const user = await userService.updateUser(userId, req.body);
      return res.status(httpStatus.OK).send(user);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async deleteUser(req, res) {
    try {
      const userService = new UserService();
      await userService.deleteUser(req.params.userId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      respondWithError(res, err);
    }
  }
};

module.exports = UserController;