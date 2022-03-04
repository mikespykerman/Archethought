const curriculumRoutes = require('express').Router();
const CurriculumController = require('./controller');

curriculumRoutes
  .get('/', CurriculumController.getAll)
  .post('/', CurriculumController.createCurriculum)
  .get('/:curriculumId', CurriculumController.retrieveCurriculum)
  .put('/:curriculumId', CurriculumController.updateCurriculum)
  .delete('/:curriculumId', CurriculumController.deleteCurriculum);

module.exports = curriculumRoutes;