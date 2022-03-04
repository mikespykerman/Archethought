const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const AccountDTO = require('../../models/dto/account');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Account Service', () => {
  let accountRepositoryMock;
  let AccountRepositoryClassMock;
  let service;
  let fakePayload;
  let fakeAccount;

  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeAccount = {
      id: 'accountid',
      name: 'string',
    };
    
    accountRepositoryMock = {
      getAll: sinon.stub(),
      getById: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub(),
    };

    AccountRepositoryClassMock = sinon
      .stub()
      .callsFake(() => accountRepositoryMock);

    const AccountService = proxyquire(
      '../../services/account',
      {
        '../database/accountRepository': AccountRepositoryClassMock,
      }
    );

    service = new AccountService();
  });

  it('should initialize the repository in constructor', () => {
    expect(AccountRepositoryClassMock.called).to.be.true;
  });

  describe('getAll', () => {
    it('should return all the accounts', async() => {
      await accountRepositoryMock.getAll.returns({ accounts: [fakeAccount], page: 1, limit: 25, total: 1})
      const res = await expect(service.getAll()).to.be.eventually.fulfilled;
      expect(accountRepositoryMock.getAll.called).to.be.true;
      expect(res.data[0]).to.be.deep.equal(new AccountDTO(fakeAccount));
      expect(res.meta).to.be.deep.equal({ 
        page: 1,
        limit: 25,
        total: 1 });
    })
  });

  describe('createAccount', () => {
    it('should throw an error if the account cannot be created', async() => {
      await accountRepositoryMock.create.withArgs(fakePayload).returns(null)
      const res = await expect(service.createAccount(fakePayload)).to.be.eventually.rejected;
      expect(accountRepositoryMock.create.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to create account.');
    });

    it('should create a new account', async() => {
      await accountRepositoryMock.create.withArgs(fakePayload).returns(fakeAccount)
      const res = await expect(service.createAccount(fakePayload)).to.be.eventually.fulfilled;
      expect(accountRepositoryMock.create.called).to.be.true;
      expect(res).to.be.deep.equal(new AccountDTO(fakeAccount));
    })
  });

  describe('retrieveAccount', () => {
    it('should throw an error if the account does not exist', async() => {
      await accountRepositoryMock.getById.returns(null)
      const res = await expect(service.retrieveAccount('accountid')).to.be.eventually.rejected;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to retrieve account.');
    })

    it('should retrieve the account', async() => {
      await accountRepositoryMock.getById.returns(fakeAccount)
      const res = await expect(service.retrieveAccount('accountid')).to.be.eventually.fulfilled;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(res).to.be.deep.equal(new AccountDTO(fakeAccount));
    })
  });

  describe('updateAccount', () => {
    it('should throw an error if the account does not exist', async() => {
      await accountRepositoryMock.getById.returns(null)
      const res = await expect(service.updateAccount('accountid', fakePayload)).to.be.eventually.rejected;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update account.');
    });

    it('should throw an error if the account can not be updated', async() => {
      await accountRepositoryMock.getById.returns(fakeAccount)
      await accountRepositoryMock.update.returns(null)
      const res = await expect(service.updateAccount('accountid', fakePayload)).to.be.eventually.rejected;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(accountRepositoryMock.update.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update account.');
    });

    it('should update an existing account', async() => {
      await accountRepositoryMock.getById.returns(fakeAccount)
      await accountRepositoryMock.update.withArgs('accountid', fakePayload).returns(fakeAccount)
      const res = await expect(service.updateAccount('accountid', fakePayload)).to.be.eventually.fulfilled;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(accountRepositoryMock.update.called).to.be.true;
      expect(res).to.be.deep.equal(new AccountDTO(fakeAccount));
    })
  });

  describe('deleteAccount', () => {
    it('should throw an exception if the the account does not exist', async() => {
      await accountRepositoryMock.getById.returns(null)
      const res = await expect(service.deleteAccount('accountid')).to.be.eventually.rejected;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete account.');
    })

    it('should throw an exception if the the account can not be deleted', async() => {
      await accountRepositoryMock.getById.returns(fakeAccount);
      await accountRepositoryMock.delete.returns(null);
      const res = await expect(service.deleteAccount('accountid')).to.be.eventually.rejected;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(accountRepositoryMock.delete.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete account.');
    })

    it('should delete the account', async() => {
      await accountRepositoryMock.getById.returns(fakeAccount);
      await accountRepositoryMock.delete.returns(fakeAccount);
      const res = await expect(service.deleteAccount('accountid')).to.be.eventually.fulfilled;
      expect(accountRepositoryMock.getById.called).to.be.true;
      expect(accountRepositoryMock.delete.called).to.be.true;
      expect(res).to.be.deep.equal(new AccountDTO(fakeAccount));
    });
  })

});