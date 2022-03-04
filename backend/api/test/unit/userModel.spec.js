const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const { spy } = require('sinon');
const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')

const UserModel = require('../../../models/user');

describe('User Model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('User');

  describe('properties', () => {
    ;['accountId',
    'firstName',
    'lastName',
    'email',
    'userName',
    'mobile',
    'password',
    'isActive',
    'isVerified',
    'isBranchAdmin',
    'isCommunityAdmin',
    'isZeoMedicalAdmin',
  
  ].forEach(checkPropertyExists(user))
  })

  describe('associations', () => {
    const Account = 'ccccccccc'

    before(() => {
      User.associate({ Account })
    })

    it('defined a belongsTo association with Account', () => {
      expect(User.belongsTo).to.have.been.calledWith(Account)
    })
  })
});
