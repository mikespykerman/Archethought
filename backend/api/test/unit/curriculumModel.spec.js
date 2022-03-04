const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const { spy } = require('sinon');
const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')

const CurriculumModel = require('../../../models/curriculum');


describe('Curriculum Model', () => {
  const Curriculum = CurriculumModel(sequelize, dataTypes);
  const curriculum = new Curriculum();

  checkModelName(Curriculum)('Curriculum');

  describe('properties', () => {
    ;['name', 'description', 'tests'].forEach(checkPropertyExists(curriculum))
  })

});