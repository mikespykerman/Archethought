const httpStatus = require("http-status");
const CurriculumService = require("../../services/curriculum");
const { respondWithError } = require("../../lib/request");

const CurriculumController = {
  async getAll(req, res) {
    try {
      const curriculumService = new CurriculumService();
      const curriculums = await curriculumService.getAll();
      return res.status(httpStatus.OK).send(curriculums);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async createCurriculum(req, res) {
    try {
      const curriculumService = new CurriculumService();
      const curriculum = await curriculumService.createCurriculum(req.body);
      return res.status(httpStatus.OK).send(curriculum);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async retrieveCurriculum(req, res) {
    try {
      const { curriculumId } = req.params;
      const curriculumService = new CurriculumService();
      const curriculum = await curriculumService.retrieveCurriculum(curriculumId);
      return res.status(httpStatus.OK).send(curriculum);
    } catch (err) {
      console.log(err);
      respondWithError(res, err);
    }
  },

  async updateCurriculum(req, res) {
    try {
      const { curriculumId } = req.params;
      const curriculumService = new CurriculumService();
      const curriculum = await curriculumService.updateCurriculum(curriculumId, req.body);
      return res.status(httpStatus.OK).send(curriculum);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async deleteCurriculum(req, res) {
    try {
      const curriculumService = new CurriculumService();
      await curriculumService.deleteCurriculum(req.params.curriculumId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      respondWithError(res, err);
    }
  }
}

module.exports = CurriculumController;