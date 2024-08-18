'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cities = [
      { city_id: 1, name: 'Damascus', arabic_name: 'دمشق', location: Sequelize.literal(`ST_GeomFromText('POINT(36.2919 33.5131)')`) },
      { city_id: 2, name: 'Aleppo', arabic_name: 'حلب', location: Sequelize.literal(`ST_GeomFromText('POINT(37.1600 36.2000)')`) },
      { city_id: 3, name: 'Homs', arabic_name: 'حمص', location: Sequelize.literal(`ST_GeomFromText('POINT(36.7094 34.7308)')`) },
      { city_id: 4, name: 'Latakia', arabic_name: 'اللاذقية', location: Sequelize.literal(`ST_GeomFromText('POINT(35.7833 35.5167)')`) },
      { city_id: 5, name: 'Hama', arabic_name: 'حماه', location: Sequelize.literal(`ST_GeomFromText('POINT(36.7500 35.1333)')`) },
      { city_id: 6, name: 'Raqqa', arabic_name: 'الرقة', location: Sequelize.literal(`ST_GeomFromText('POINT(39.0100 35.9500)')`) },
      { city_id: 7, name: 'Deir ez-Zor', arabic_name: 'دير الزور', location: Sequelize.literal(`ST_GeomFromText('POINT(40.1500 35.3333)')`) },
      { city_id: 8, name: 'Al-Hasakah', arabic_name: 'الحسكة', location: Sequelize.literal(`ST_GeomFromText('POINT(40.7422 36.5117)')`) },
      { city_id: 9, name: 'Daraa', arabic_name: 'درعا', location: Sequelize.literal(`ST_GeomFromText('POINT(36.1021 32.6189)')`) },
      { city_id: 10, name: 'Tartus', arabic_name: 'طرطوس', location: Sequelize.literal(`ST_GeomFromText('POINT(35.8833 34.8833)')`) },
      { city_id: 11, name: 'Idlib', arabic_name: 'إدلب', location: Sequelize.literal(`ST_GeomFromText('POINT(36.6333 35.9333)')`) },
      { city_id: 12, name: 'Al-Qamishli', arabic_name: 'القامشلي', location: Sequelize.literal(`ST_GeomFromText('POINT(41.2200 37.0500)')`) },
      { city_id: 13, name: 'Al Qunaytirah', arabic_name: 'القنيطرة', location: Sequelize.literal(`ST_GeomFromText('POINT(35.8239 33.1256)')`) },
      { city_id: 14, name: 'As-Suwayda', arabic_name: 'السويداء', location: Sequelize.literal(`ST_GeomFromText('POINT(36.5667 32.7125)')`) }
    ];
    

    await queryInterface.bulkInsert('cities', cities, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
