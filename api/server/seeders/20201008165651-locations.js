'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('locations', [
      {
        "location_id": 1,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Amsterdam RAI"
      },
      {
        "location_id": 2,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Rotterdam Ahoy"
      },
      {
        "location_id": 3,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Den Haag / Delft Stadion"
      },
      {
        "location_id": 4,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Utrecht Jaarbeurs"
      },
      {
        "location_id": 5,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Eindhoven Airport"
      },
      {
        "location_id": 6,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Groningen Airport"
      },
      {
        "location_id": 7,
        "start_time": "7:00",
        "end_time": "22:00",
        "capacity": 3,
        "name": "Nijmegen Centrum"
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
