const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const DeviceDTO = require('../../models/dto/device');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Device Service', () => {
  let deviceRepositoryMock;
  let DeviceRepositoryClassMock;
  let service;
  let fakePayload;
  let fakeDevice;

  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeDevice = {
      id: 'deviceid',
      name: 'string',
    };
    
    deviceRepositoryMock = {
      getAccounts: sinon.stub(),
      getAll: sinon.stub(),
      getById: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub(),
    };

    DeviceRepositoryClassMock = sinon
      .stub()
      .callsFake(() => deviceRepositoryMock);

    const DeviceService = proxyquire(
      '../../services/device',
      {
        '../database/deviceRepository': DeviceRepositoryClassMock,
      }
    );

    service = new DeviceService();
  });

  it('should initialize the repository in constructor', () => {
    expect(DeviceRepositoryClassMock.called).to.be.true;
  });

  describe('getAll', () => {
    it('should return all devices', async() => {
      await deviceRepositoryMock.getAll.returns({ devices: [fakeDevice], page: 1, limit: 25, total: 1})
      const res = await expect(service.getAll()).to.be.eventually.fulfilled;
      expect(deviceRepositoryMock.getAll.called).to.be.true;
      expect(res.data[0]).to.be.deep.equal(new DeviceDTO(fakeDevice));
      expect(res.meta).to.be.deep.equal({ 
        page: 1,
        limit: 25,
        total: 1 });
    })
  });

  describe('createDevice', () => {

    it('should create a new device', async() => {
      await deviceRepositoryMock.create.withArgs(fakePayload).returns(fakeDevice)
      const res = await expect(service.createDevice(fakePayload)).to.be.eventually.fulfilled;
      expect(deviceRepositoryMock.create.called).to.be.true;
      expect(res).to.be.deep.equal(new DeviceDTO(fakeDevice));
    })
  });

  describe('getDevice', async() => {
    it('should throw an error if the device does not exist', async() => {
      await deviceRepositoryMock.getById.returns(null);
      const res = await expect(service.getDevice('deviceid')).to.be.eventually.rejected;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to retrieve device.');
    })

    it('should retrieve the device by id', async() => {
      await deviceRepositoryMock.getById.returns(fakeDevice);
      const res = await expect(service.getDevice('deviceid')).to.be.eventually.fulfilled;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(res).to.be.deep.equal(new DeviceDTO(fakeDevice));
    })
  });

  describe('updateDevice', () => {
    it('should throw an error if the device does not exist', async() => {
      await deviceRepositoryMock.getById.returns(null)
      const res = await expect(service.updateDevice('deviceid', fakePayload)).to.be.eventually.rejected;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update device.');
    });

    it('should throw an error if the user can not be updated', async() => {
      await deviceRepositoryMock.getById.returns(fakeDevice)
      await deviceRepositoryMock.update.returns(null)
      const res = await expect(service.updateDevice('deviceid', fakePayload)).to.be.eventually.rejected;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(deviceRepositoryMock.update.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update device.');
    });

    it('should update an existing device', async() => {
      await deviceRepositoryMock.getById.returns(fakeDevice)
      await deviceRepositoryMock.update.withArgs('deviceid', fakePayload).returns(fakeDevice)
      const res = await expect(service.updateDevice('deviceid', fakePayload)).to.be.eventually.fulfilled;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(deviceRepositoryMock.update.called).to.be.true;
      expect(res).to.be.deep.equal(new DeviceDTO(fakeDevice));
    })
  });

  describe('deleteDevice', () => {
    it('should throw an exception if the device does not exist', async() => {
      await deviceRepositoryMock.getById.returns(null)
      const res = await expect(service.deleteDevice('deviceid')).to.be.eventually.rejected;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete device.');
    })

    it('should throw an exception if the device can not be deleted', async() => {
      await deviceRepositoryMock.getById.returns(fakeDevice);
      await deviceRepositoryMock.delete.returns(null);
      const res = await expect(service.deleteDevice('deviceid')).to.be.eventually.rejected;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(deviceRepositoryMock.delete.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete device.');
    })

    it('should delete the device', async() => {
      await deviceRepositoryMock.getById.returns(fakeDevice);
      await deviceRepositoryMock.delete.returns(fakeDevice);
      const res = await expect(service.deleteDevice('userid')).to.be.eventually.fulfilled;
      expect(deviceRepositoryMock.getById.called).to.be.true;
      expect(deviceRepositoryMock.delete.called).to.be.true;
      expect(res).to.be.deep.equal(new DeviceDTO(fakeDevice));
    });
  })

});