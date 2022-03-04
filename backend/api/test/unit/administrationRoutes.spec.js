const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const AdministrationController = require('../../routes/account/controller');
let fakePayload;
let fakeAccount;

describe('Administration Routes', () => {
  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeAccount = {
      id: 'accountid',
      name: 'string',
    };
  });

  describe('GET /administration', () => {
    it('should get all accounts', async () => {
      let resSpy = sinon.spy();
      const req = {}; 
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      };
      await AdministrationController.getAll(req,res);
      expect(resSpy.calledOnce).to.equal(true);
    });
  });
});