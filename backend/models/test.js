'use strict';
const { Model } = require('sequelize');

const TestModel = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    'Test', 
    {
      name: DataTypes.STRING,
      userId: DataTypes.UUID,
      curtState: DataTypes.STRING,
      description: DataTypes.STRING,
      result: DataTypes.STRING,
      status: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Test',
    });
  return Test;
};

module.exports = TestModel;