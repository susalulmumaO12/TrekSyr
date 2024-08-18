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
    return queryInterface.bulkInsert('licences', [
      {
        user_id: 2,
        image_path: "..\\..\\..\\public\\licences\\licenceImage-1720200913019-374916348.jpg"
      },
      {
        user_id: 4,
        image_path: "..\\..\\..\\public\\licences\\licenceImage-1720175581792-783877763.png"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('licences', null, {});
  }
  
};
