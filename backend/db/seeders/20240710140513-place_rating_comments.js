'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('place_rating_comments', [
      { rate_id: 1, comment: 'Amazing place, highly recommend!' },
      { rate_id: 2, comment: 'Great experience, but could be better.' },
      { rate_id: 3, comment: 'Loved the ambiance and the service.' },
      { rate_id: 4, comment: 'Not bad, but room for improvement.' },
      { rate_id: 5, comment: 'Perfect place for a relaxing stay.' },
      { rate_id: 6, comment: 'Good value for money.' },
      { rate_id: 7, comment: 'Fantastic guide and beautiful scenery.' },
      { rate_id: 8, comment: 'Okay experience, but not memorable.' },
      { rate_id: 9, comment: 'Pleasant visit, would come again.' },
      { rate_id: 10, comment: 'Exceptional service and views!' },
      { rate_id: 11, comment: 'One of the best trips I have had.' },
      { rate_id: 12, comment: 'Good, but could have been better.' },
      { rate_id: 13, comment: 'Nice place to visit with family.' },
      { rate_id: 14, comment: 'Fantastic! Highly recommended.' },
      { rate_id: 15, comment: 'Good place for a short trip.' },
      { rate_id: 16, comment: 'Decent experience, but not great.' },
      { rate_id: 17, comment: 'Outstanding location and service.' },
      { rate_id: 18, comment: 'Nice place, will visit again.' },
      { rate_id: 19, comment: 'Great for nature lovers.' },
      { rate_id: 20, comment: 'Average experience, not the best.' },
      { rate_id: 21, comment: 'Wonderful trip, will recommend.' },
      { rate_id: 22, comment: 'Good experience overall.' },
      { rate_id: 23, comment: 'Excellent place and guide.' },
      { rate_id: 24, comment: 'Nice trip, but could improve.' },
      { rate_id: 25, comment: 'Great place for a day trip.' },
      { rate_id: 26, comment: 'Not as good as expected.' },
      { rate_id: 27, comment: 'Fantastic experience!' },
      { rate_id: 28, comment: 'Good place, worth visiting.' },
      { rate_id: 29, comment: 'Enjoyed the visit a lot.' },
      { rate_id: 30, comment: 'Superb experience, five stars!' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('place_rating_comments', null, {});
  }
};
