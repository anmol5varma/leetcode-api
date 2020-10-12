'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('test_results', {
      tt_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      ts_id: {
        type: Sequelize.STRING
      },
      is_positive: {
        type: Sequelize.BOOLEAN,
      },
      result_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('test_results');
  }
};