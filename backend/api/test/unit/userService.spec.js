const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const UserDTO = require('../../models/dto/user');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('User Service', () => {
  let userRepositoryMock;
  let UserRepositoryClassMock;
  let service;
  let fakePayload;
  let fakeUser;

  beforeEach(() => {
    fakePayload = {
      name: 'name',
    };

    fakeUser = {
      id: 'userid',
      firstName: 'string',
    };
    
    userRepositoryMock = {
      getAccounts: sinon.stub(),
      getAll: sinon.stub(),
      getById: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub(),
    };

    UserRepositoryClassMock = sinon
      .stub()
      .callsFake(() => userRepositoryMock);

    const UserService = proxyquire(
      '../../services/user',
      {
        '../database/userRepository': UserRepositoryClassMock,
      }
    );

    service = new UserService();
  });

  it('should initialize the repository in constructor', () => {
    expect(UserRepositoryClassMock.called).to.be.true;
  });

  describe('getAll', () => {
    it('should return all the users', async() => {
      await userRepositoryMock.getAll.returns({ users: [fakeUser], page: 1, limit: 25, total: 1})
      const res = await expect(service.getAll()).to.be.eventually.fulfilled;
      expect(userRepositoryMock.getAll.called).to.be.true;
      expect(res.data[0]).to.be.deep.equal(new UserDTO(fakeUser));
      expect(res.meta).to.be.deep.equal({ 
        page: 1,
        limit: 25,
        total: 1 });
    })
  });

  describe('createUser', () => {

    it('should create a new user', async() => {
      await userRepositoryMock.create.withArgs(fakePayload).returns(fakeUser)
      const res = await expect(service.createUser(fakePayload)).to.be.eventually.fulfilled;
      expect(userRepositoryMock.create.called).to.be.true;
      expect(res).to.be.deep.equal(new UserDTO(fakeUser));
    })
  });

  describe('getUser', async() => {
    it('should throw an error if the user does not exist', async() => {
      await userRepositoryMock.getById.returns(null);
      const res = await expect(service.getUser('userid')).to.be.eventually.rejected;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to retrieve user.');
    })

    it('should retrieve the user by id', async() => {
      await userRepositoryMock.getById.returns(fakeUser);
      const res = await expect(service.getUser('userid')).to.be.eventually.fulfilled;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(res).to.be.deep.equal(new UserDTO(fakeUser));
    })
  });

  describe('updateUser', () => {
    it('should throw an error if the user does not exist', async() => {
      await userRepositoryMock.getById.returns(null)
      const res = await expect(service.updateUser('userid', fakePayload)).to.be.eventually.rejected;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update user.');
    });

    it('should throw an error if the user can not be updated', async() => {
      await userRepositoryMock.getById.returns(fakeUser)
      await userRepositoryMock.update.returns(null)
      const res = await expect(service.updateUser('userid', fakePayload)).to.be.eventually.rejected;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(userRepositoryMock.update.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to update user.');
    });

    it('should update an existing account', async() => {
      await userRepositoryMock.getById.returns(fakeUser)
      await userRepositoryMock.update.withArgs('userid', fakePayload).returns(fakeUser)
      const res = await expect(service.updateUser('userid', fakePayload)).to.be.eventually.fulfilled;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(userRepositoryMock.update.called).to.be.true;
      expect(res).to.be.deep.equal(new UserDTO(fakeUser));
    })
  });

  describe('deleteUser', () => {
    it('should throw an exception if the user does not exist', async() => {
      await userRepositoryMock.getById.returns(null)
      const res = await expect(service.deleteUser('userid')).to.be.eventually.rejected;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete user.');
    })

    it('should throw an exception if the user can not be deleted', async() => {
      await userRepositoryMock.getById.returns(fakeUser);
      await userRepositoryMock.delete.returns(null);
      const res = await expect(service.deleteUser('userid')).to.be.eventually.rejected;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(userRepositoryMock.delete.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('Unable to delete user.');
    })

    it('should delete the user', async() => {
      await userRepositoryMock.getById.returns(fakeUser);
      await userRepositoryMock.delete.returns(fakeUser);
      const res = await expect(service.deleteUser('userid')).to.be.eventually.fulfilled;
      expect(userRepositoryMock.getById.called).to.be.true;
      expect(userRepositoryMock.delete.called).to.be.true;
      expect(res).to.be.deep.equal(new UserDTO(fakeUser));
    });
  })

});