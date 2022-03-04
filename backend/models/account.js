'use strict';
const { Model } = require('sequelize');
const User = require('../models/user');

const AccountModel = (sequelize, DataTypes) => {
  // class Account extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //     Account.hasMany(models.User, { foreignKey: 'accountId', as: 'accounts'})
  //   }
  // }
  // Account.init({
  const Account = sequelize.define(
      'Account', 
      {
        name: DataTypes.STRING
      },
      {
      sequelize,
      }
  );

  Account.associate = ({ User }) => {
    Account.hasMany(User, { foreignKey: 'accountId', as: 'accounts'});
  }

  return Account;
};

module.exports = AccountModel;

