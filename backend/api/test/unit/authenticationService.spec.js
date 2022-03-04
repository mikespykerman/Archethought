const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const AccountDTO = require('../../models/dto/account');
const AuthUserDTO = require('../../models/dto/authUser');
const { User } = require('../../../models/user');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Authentication Service', () => {
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
      getById: sinon.stub(),
      getByEmail: sinon.stub(),
      create: sinon.stub(),
    };

    UserRepositoryClassMock = sinon
      .stub()
      .callsFake(() => userRepositoryMock);

    const AuthenticationService = proxyquire(
      '../../services/authentication',
      {
        '../database/userRepository': UserRepositoryClassMock,
      }
    );

    service = new AuthenticationService();
  });

  it('should initialize the repository in constructor', () => {
    expect(UserRepositoryClassMock.called).to.be.true;
  });

  describe('login', () => {
    it('should log in the user', async() => {
      await userRepositoryMock.getByEmail.withArgs('joebologna@gmail.com').returns(fakeUser);
    })

    it('should log in a user and generate a token', async() => {
      await userRepositoryMock.getByEmail.withArgs('joebologna@gmail.com').returns(fakeUser);
      const isMatched = true;
      const token = 'abcde';
      const res = await expect(service.login('joebologna@gmail.com', 'password')).to.be.eventually.fulfilled;
      //expect(res).to.be.deep.equal({ user: new AuthUserDTO(fakeUser), token: token });
    })
  });

  describe('registerUser', () => {
    it('should throw an error message if the user already exists', async() => {
      await userRepositoryMock.getByEmail.returns(fakeUser);
      const res = await expect(service.registerUser(fakePayload)).to.be.eventually.rejected;
      expect(userRepositoryMock.getByEmail.called).to.be.true;
      expect(res.statusCode).to.be.equal(400);
      expect(res.description).to.be.equal('User already exists.');
    })
  })
});