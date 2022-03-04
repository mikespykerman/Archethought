'use strict';
const { Model } = require('sequelize');

const DeviceModel = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    'Device',
    {
      name: DataTypes.STRING,
      cpu: DataTypes.STRING,
      description: DataTypes.STRING,
      deviceId: DataTypes.UUID,
      serialNumber:  DataTypes.STRING,
      status: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Device',
    });
    
  return Device;
};

module.exports = DeviceModel;