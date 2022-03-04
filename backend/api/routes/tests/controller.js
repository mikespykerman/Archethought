const httpStatus = require("http-status");
const TestingService = require("../../services/testing");
const { respondWithError } = require("../../lib/request");

const TestingController = {
  async getAll(req, res) {
    try {
      const testingService = new TestingService();
      const tests = await testingService.getAll();
      return res.status(httpStatus.OK).send(tests);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async createTesting(req, res) {
    try {
      const testingService = new TestingService();
      const test = await testingService.createTest(req.body);
      return res.status(httpStatus.OK).send(test);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async retrieveTesting(req, res) {
    try {
      const { testingId } = req.params;
      const testingService = new TestingService();
      const testing = await testingService.retrieveTest(testingId);
      return res.status(httpStatus.OK).send(testing);
    } catch (err) {
      console.log(err);
      respondWithError(res, err);
    }
  },

  async updateTesting(req, res) {
    try {
      const { testingId } = req.params;
      const testingService = new TestingService();
      const testing = await testingService.updateTest(testingId, req.body);
      return res.status(httpStatus.OK).send(testing);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async deleteTesting(req, res) {
    try {
      const testingService = new TestingService();
      await testingService.deleteTest(req.params.testingId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      respondWithError(res, err);
    }
  }
}

module.exports = TestingController;