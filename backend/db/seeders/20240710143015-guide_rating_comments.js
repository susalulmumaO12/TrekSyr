'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('guide_rating_comments', [
      { rate_id: 1, comment: 'Excellent guide, very knowledgeable!' },
      { rate_id: 2, comment: 'Good guide, but could improve on timing.' },
      { rate_id: 3, comment: 'Fantastic experience with this guide.' },
      { rate_id: 4, comment: 'Decent guide, but not the best.' },
      { rate_id: 5, comment: 'Great guide, would recommend.' },
      { rate_id: 6, comment: 'Awesome guide, very helpful and friendly.' },
      { rate_id: 7, comment: 'Best guide I have ever had.' },
      { rate_id: 8, comment: 'Good guide, but a bit rushed.' },
      { rate_id: 9, comment: 'Very knowledgeable and friendly guide.' },
      { rate_id: 10, comment: 'Excellent experience, top-notch guide.' },
      { rate_id: 11, comment: 'Average guide, room for improvement.' },
      { rate_id: 12, comment: 'Amazing guide, highly recommend.' },
      { rate_id: 13, comment: 'Good experience with this guide.' },
      { rate_id: 14, comment: 'Fantastic guide, very professional.' },
      { rate_id: 15, comment: 'Great guide, very informative.' },
      { rate_id: 16, comment: 'Good guide, but could be better.' },
      { rate_id: 17, comment: 'Excellent guide, very accommodating.' },
      { rate_id: 18, comment: 'Nice guide, very helpful.' },
      { rate_id: 19, comment: 'Superb guide, great experience.' },
      { rate_id: 20, comment: 'Okay guide, not the best experience.' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('guide_rating_comments', null, {});
  }
};
