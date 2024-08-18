'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('place_ratings', [
      {
        rate_id: 1,
        user_id: 5,
        place_id: 15,
        rate: 5
      },
      {
        rate_id: 2,
        user_id: 6,
        place_id: 15,
        rate: 4
      },
      {
        rate_id: 3,
        user_id: 7,
        place_id: 16,
        rate: 4
      },
      {
        rate_id: 4,
        user_id: 8,
        place_id: 16,
        rate: 3
      },
      {
        rate_id: 5,
        user_id: 5,
        place_id: 17,
        rate: 5
      },
      {
        rate_id: 6,
        user_id: 6,
        place_id: 17,
        rate: 4
      },
      {
        rate_id: 7,
        user_id: 7,
        place_id: 18,
        rate: 5
      },
      {
        rate_id: 8,
        user_id: 8,
        place_id: 18,
        rate: 3
      },
      {
        rate_id: 9,
        user_id: 5,
        place_id: 19,
        rate: 4
      },
      {
        rate_id: 10,
        user_id: 6,
        place_id: 19,
        rate: 5
      },
      {
        rate_id: 11,
        user_id: 7,
        place_id: 20,
        rate: 5
      },
      {
        rate_id: 12,
        user_id: 8,
        place_id: 20,
        rate: 4
      },
      {
        rate_id: 13,
        user_id: 5,
        place_id: 21,
        rate: 4
      },
      {
        rate_id: 14,
        user_id: 6,
        place_id: 21,
        rate: 5
      },
      {
        rate_id: 15,
        user_id: 7,
        place_id: 22,
        rate: 4
      },
      {
        rate_id: 16,
        user_id: 8,
        place_id: 22,
        rate: 3
      },
      {
        rate_id: 17,
        user_id: 5,
        place_id: 23,
        rate: 5
      },
      {
        rate_id: 18,
        user_id: 6,
        place_id: 23,
        rate: 4
      },
      {
        rate_id: 19,
        user_id: 7,
        place_id: 24,
        rate: 4
      },
      {
        rate_id: 20,
        user_id: 8,
        place_id: 24,
        rate: 3
      },
      {
        rate_id: 21,
        user_id: 5,
        place_id: 25,
        rate: 5
      },
      {
        rate_id: 22,
        user_id: 6,
        place_id: 25,
        rate: 4
      },
      {
        rate_id: 23,
        user_id: 7,
        place_id: 26,
        rate: 5
      },
      {
        rate_id: 24,
        user_id: 8,
        place_id: 26,
        rate: 4
      },
      {
        rate_id: 25,
        user_id: 5,
        place_id: 27,
        rate: 4
      },
      {
        rate_id: 26,
        user_id: 6,
        place_id: 27,
        rate: 3
      },
      {
        rate_id: 27,
        user_id: 7,
        place_id: 28,
        rate: 5
      },
      {
        rate_id: 28,
        user_id: 8,
        place_id: 28,
        rate: 4
      },
      {
        rate_id: 29,
        user_id: 5,
        place_id: 29,
        rate: 4
      },
      {
        rate_id: 30,
        user_id: 6,
        place_id: 29,
        rate: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('place_ratings', null, {});
  }
};
