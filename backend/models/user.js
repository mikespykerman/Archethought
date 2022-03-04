'use strict';
const bcrypt = require('bcrypt');
const {  Model } = require('sequelize');

const UserModel = (sequelize, DataTypes) => {
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //     User.belongsTo(models.Account, { foreignKey: 'accountId', as: 'accounts' })
  //   }
  // }
  // User.init({
  const User = sequelize.define(
      'User', 
      {
        accountId: { type: DataTypes.UUID },
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        userName: { type: DataTypes.STRING },
        mobile: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        isActive: { 
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        isVerified: { 
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        isBranchAdmin: { 
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        isCommunityAdmin: { 
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        isZeoMedicalAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      }, 
      {
        sequelize,
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const saltRounds = 10;
              const salt = await bcrypt.genSalt(saltRounds);
              user.password = await bcrypt.hash(user.password, salt)
            }
          },
        },
  });
  
  User.associate = ({ Account }) => {
    User.belongsTo(Account, { foreignKey: 'accountId', as: 'accounts' });
  }
    
  User.prototype.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  return User;
};

module.exports = UserModel;
