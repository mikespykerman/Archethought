'use strict';
const { Model } = require('sequelize');

const CurriculumModel = (sequelize, DataTypes) => {
  const Curriculum = sequelize.define(
    'Curriculum',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      tests: DataTypes.STRING,
    }, 
    {
    sequelize,
  });

  return Curriculum;
};

module.exports = CurriculumModel;