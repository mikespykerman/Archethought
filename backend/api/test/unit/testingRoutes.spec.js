const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const TestController = require('../../routes/tests/controller');
let fakePayload;
let fakeTest;

describe('Test Routes', () => {
  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeTest = {
      id: 'testid',
      name: 'string',
    };
  });

  describe('GET /test', () => {
    it('should get all tests', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await TestController.getAll(req,res);
      expect(resSpy.calledOnce).to.equal(true);
    });
  });

  describe('POST /test', () => {
    it('should create a new test', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await TestController.createTesting(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('GET /test/:testingId', () => {
    it('should retrieve a specific test', async () => {
      let resSpy = sinon.spy();
      const req = { params: { testingId: 'testingId'} }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await TestController.retrieveTesting(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('PUT /test/:testId', () => {
    it('should update a specific test', async () => {
      let resSpy = sinon.spy();
      const req = {params: { testingId: 'testId'}}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await TestController.updateTesting(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('DELETE /test/:testId', () => {
    it('should delete a specific test', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await TestController.deleteTesting(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });
});