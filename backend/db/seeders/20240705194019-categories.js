'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      { category_id: 1, name: 'Mountains' , arabic_name: 'جبال'},
      { category_id: 2, name: 'Beach' , arabic_name: 'شواطئ'},
      { category_id: 3, name: 'Forest' , arabic_name: 'غابات'},
      { category_id: 4, name: 'Antiquities' , arabic_name: 'آثار'},
      { category_id: 5, name: 'Restaurants' , arabic_name: 'مطاعم'},
      { category_id: 6, name: 'Hotels' , arabic_name: 'فنادق'},
      { category_id: 7, name: 'Transportation' , arabic_name: 'وسائل نقل'}
    ];

    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
