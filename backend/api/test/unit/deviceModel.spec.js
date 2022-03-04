const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const { spy } = require('sinon');
const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')

const DeviceModel = require('../../../models/device');


describe('Device Model', () => {
  const Device = DeviceModel(sequelize, dataTypes);
  const device = new Device();

  checkModelName(Device)('Device');

  describe('properties', () => {
    ;['name',
    'cpu',
    'description',
    'deviceId',
    'serialNumber',
    'status'
  
  ].forEach(checkPropertyExists(device))
  })

});