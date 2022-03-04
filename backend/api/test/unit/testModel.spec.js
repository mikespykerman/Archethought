const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const { spy } = require('sinon');
const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')

const TestModel = require('../../../models/test');


describe('Test Model', () => {
  const Test = TestModel(sequelize, dataTypes);
  const test = new Test();

  checkModelName(Test)('Test');

  describe('properties', () => {
    ;['name',
    'userId',
    'curtState',
    'description',
    'result',
    'status'  
  ].forEach(checkPropertyExists(test))
  })

});