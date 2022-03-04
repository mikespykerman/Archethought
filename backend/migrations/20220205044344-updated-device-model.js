'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.dropTable('Devices');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};
