'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('booked_trips', [
      { trip_id: 1, user_id: 3},
      { trip_id: 2, user_id: 5 },
      { trip_id: 3, user_id: 6 },
      { trip_id: 1, user_id: 7},
      { trip_id: 2, user_id: 8 },
      { trip_id: 3, user_id: 3 },
      { trip_id: 1, user_id: 5},
      { trip_id: 2, user_id: 6 },
      { trip_id: 3, user_id: 7 },
      { trip_id: 1, user_id: 8},
      { trip_id: 2, user_id: 3 },
      { trip_id: 3, user_id: 5 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('booked_trips', null, {});
  }
};
