'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      appointment_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      appointment_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      no_of_people: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      scan_count: {
        type: Sequelize.INTEGER
      },
      checkin_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  }
};