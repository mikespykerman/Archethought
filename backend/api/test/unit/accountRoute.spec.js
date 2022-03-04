const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const AccountController = require('../../routes/account/controller');
let fakePayload;
let fakeAccount;

describe('Account Routes', () => {
  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeAccount = {
      id: 'curriculum',
      name: 'string',
    };
  });

  describe('GET /accounts', () => {
    it('should get all accounts', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AccountController.getAll(req,res);
      expect(resSpy.calledOnce).to.equal(true);
    });
  });

  describe('POST /accounts', () => {
    it('should create a new account', async () => {
      let resSpy = sinon.spy();
      const req = { params: { accountId: 'accountId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AccountController.createAccount(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('GET /accounts/:accountId', () => {
    it('should retrieve a specific account', async () => {
      let resSpy = sinon.spy();
      const req = { params: { accountId: 'accountId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AccountController.retrieveAccount(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('PUT /accounts/:accountId', () => {
    it('should update a specific account', async () => {
      let resSpy = sinon.spy();
      const req = { params: { accountId: 'accountId' } }; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AccountController.updateAccount(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });

  describe('DELETE /accounts/:accountId', () => {
    it('should delete a specific account', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AccountController.deleteAccount(req, res);
      expect(resSpy.calledOnce).to.be.equal(true);
    });
  });
});
