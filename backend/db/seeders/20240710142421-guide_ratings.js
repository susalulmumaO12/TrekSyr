'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('guide_ratings', [
      { guide_rating_id: 1, user_id: 5, guide_id: 2, rate: 5 },
      { guide_rating_id: 2, user_id: 6, guide_id: 2, rate: 4 },
      { guide_rating_id: 3, user_id: 7, guide_id: 4, rate: 5 },
      { guide_rating_id: 4, user_id: 8, guide_id: 4, rate: 3 },
      { guide_rating_id: 5, user_id: 5, guide_id: 2, rate: 4 },
      { guide_rating_id: 6, user_id: 6, guide_id: 2, rate: 5 },
      { guide_rating_id: 7, user_id: 7, guide_id: 4, rate: 5 },
      { guide_rating_id: 8, user_id: 8, guide_id: 4, rate: 4 },
      { guide_rating_id: 9, user_id: 5, guide_id: 2, rate: 4 },
      { guide_rating_id: 10, user_id: 6, guide_id: 2, rate: 5 },
      { guide_rating_id: 11, user_id: 7, guide_id: 4, rate: 3 },
      { guide_rating_id: 12, user_id: 8, guide_id: 4, rate: 5 },
      { guide_rating_id: 13, user_id: 5, guide_id: 2, rate: 4 },
      { guide_rating_id: 14, user_id: 6, guide_id: 2, rate: 5 },
      { guide_rating_id: 15, user_id: 7, guide_id: 4, rate: 5 },
      { guide_rating_id: 16, user_id: 8, guide_id: 4, rate: 4 },
      { guide_rating_id: 17, user_id: 5, guide_id: 2, rate: 5 },
      { guide_rating_id: 18, user_id: 6, guide_id: 2, rate: 4 },
      { guide_rating_id: 19, user_id: 7, guide_id: 4, rate: 5 },
      { guide_rating_id: 20, user_id: 8, guide_id: 4, rate: 3 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('guide_ratings', null, {});
  }
};
