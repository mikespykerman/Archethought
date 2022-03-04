const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const { spy } = require('sinon');
const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')

const AccountModel = require('../../../models/account');
const UserModel = require('../../../models/user');

describe('Account Model', () => {
  const Account = AccountModel(sequelize, dataTypes);
  const account = new Account();

  checkModelName(Account)('Account');

  describe('properties', () => {
    ;['name'].forEach(checkPropertyExists(account))
  })

  describe('associations', () => {
    const User = 'ccccccccc'

    before(() => {
      Account.associate({ User })
    })

    it('defined a hasMany association with User', () => {
      expect(Account.hasMany).to.have.been.calledWith(User)
    })
  })
});