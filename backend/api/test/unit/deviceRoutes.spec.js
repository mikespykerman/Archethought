const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const DeviceController = require('../../routes/devices/controller');
let fakePayload;
let fakeDevice;

describe('Device Routes', () => {
  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeDevice = {
      id: 'deviceid',
      name: 'string',
    };
  });

  describe('GET /device', () => {
    it('should get all devices', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await DeviceController.getAll(req,res);
      expect(resSpy.calledOnce).to.equal(true);
    });
  });

  describe('POST /device', () => {
    it('should create a new device', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await DeviceController.createDevice(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('GET /device/:deviceId', () => {
    it('should retrieve a specific device', async () => {
      let resSpy = sinon.spy();
      const req = { params: { deviceId: 'deviceId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await DeviceController.retrieveDevice(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('PUT /device/:deviceId', () => {
    it('should update a specific device', async () => {
      let resSpy = sinon.spy();
      const req = { params: { deviceId: 'deviceId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await DeviceController.updateDevice(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('DELETE /device/:deviceId', () => {
    it('should delete a specific device', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await DeviceController.deleteDevice(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });
});