const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const TestDTO = require('../../models/dto/test');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Testing Service', () => {
  let testingRepositoryMock;
  let TestingRepositoryClassMock;
  let service;
  let fakePayload;
  let fakeTest;

  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeTest = {
      id: 'testid',
      name: 'string',
    };
    
    testingRepositoryMock = {
      getAccounts: sinon.stub(),
      getAll: sinon.stub(),
      getById: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub(),
    };

    TestingRepositoryClassMock = sinon
      .stub()
      .callsFake(() => testingRepositoryMock);

    const TestingService = proxyquire(
      '../../services/testing',
      {
        '../database/testingRepository': TestingRepositoryClassMock,
      }
    );

    service = new TestingService();
  });

  it('should initialize the repository in constructor', () => {
    expect(TestingRepositoryClassMock.called).to.be.true;
  });

  describe('getAll', () => {
    it('should return all the users', async() => {
      await testingRepositoryMock.getAll.returns({ tests: [fakeTest], page: 1, limit: 25, total: 1})
      const res = await expect(service.getAll()).to.be.eventually.fulfilled;
      expect(testingRepositoryMock.getAll.called).to.be.true;
      expect(res.data[0]).to.be.deep.equal(new TestDTO(fakeTest));
      expect(res.meta).to.be.deep.equal({ 
        page: 1,
        limit: 25,
        total: 1 });
    })
  });

  describe('createTest', () => {
    it('should create a new test', async() => {
      await testingRepositoryMock.create.withArgs(fakePayload).returns(fakeTest)
      const res = await expect(service.createTest(fakePayload)).to.be.eventually.fulfilled;
      expect(testingRepositoryMock.create.called).to.be.true;
      expect(res).to.be.deep.equal(new TestDTO(fakeTest));
    })
  });
  
  describe('retrieveTest', async() => {
    it('should throw an error if the test does not exist', async() => {
      await testingRepositoryMock.getById.returns(null);
      const res = await expect(service.retrieveTest('testid')).to.be.eventually.rejected;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to retrieve test.');
    })

    it('should retrieve the test by id', async() => {
      await testingRepositoryMock.getById.returns(fakeTest);
      const res = await expect(service.retrieveTest('testid')).to.be.eventually.fulfilled;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(res).to.be.deep.equal(new TestDTO(fakeTest));
    })
  });

  describe('updateTest', () => {
    it('should throw an error if the test does not exist', async() => {
      await testingRepositoryMock.getById.returns(null)
      const res = await expect(service.updateTest('testid', fakePayload)).to.be.eventually.rejected;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update test.');
    });

    it('should throw an error if the user can not be updated', async() => {
      await testingRepositoryMock.getById.returns(fakeTest)
      await testingRepositoryMock.update.returns(null)
      const res = await expect(service.updateTest('testid', fakePayload)).to.be.eventually.rejected;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(testingRepositoryMock.update.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update test.');
    });

    it('should update an existing test', async() => {
      await testingRepositoryMock.getById.returns(fakeTest)
      await testingRepositoryMock.update.withArgs('testid', fakePayload).returns(fakeTest)
      const res = await expect(service.updateTest('testid', fakePayload)).to.be.eventually.fulfilled;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(testingRepositoryMock.update.called).to.be.true;
      expect(res).to.be.deep.equal(new TestDTO(fakeTest));
    })
  });

  describe('deleteTest', () => {
    it('should throw an exception if the test does not exist', async() => {
      await testingRepositoryMock.getById.returns(null)
      const res = await expect(service.deleteTest('testid')).to.be.eventually.rejected;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete test.');
    })

    it('should throw an exception if the test can not be deleted', async() => {
      await testingRepositoryMock.getById.returns(fakeTest);
      await testingRepositoryMock.delete.returns(null);
      const res = await expect(service.deleteTest('testid')).to.be.eventually.rejected;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(testingRepositoryMock.delete.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete test.');
    })

    it('should delete the test', async() => {
      await testingRepositoryMock.getById.returns(fakeTest);
      await testingRepositoryMock.delete.returns(fakeTest);
      const res = await expect(service.deleteTest('userid')).to.be.eventually.fulfilled;
      expect(testingRepositoryMock.getById.called).to.be.true;
      expect(testingRepositoryMock.delete.called).to.be.true;
      expect(res).to.be.deep.equal(new TestDTO(fakeTest));
    });
  })

});