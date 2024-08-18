'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('trip_paths', [
      {
        trip_path_id: 1,
        trip_id: 1,
        place_id: 1, // Haretna Restaurant (Category 5)
        time: new Date('2024-07-01T08:30:00Z')
      },
      {
        trip_path_id: 2,
        trip_id: 1,
        place_id: 3, // Krak des Chevaliers (Category 4)
        time: new Date('2024-07-01T10:00:00Z')
      },
      {
        trip_path_id: 3,
        trip_id: 1,
        place_id: 4, // Blue Beach Resort (Category 2)
        time: new Date('2024-07-01T13:00:00Z')
      },
      {
        trip_path_id: 4,
        trip_id: 2,
        place_id: 2, // Sheraton Aleppo Hotel (Category 6)
        time: new Date('2024-07-05T09:30:00Z')
      },
      {
        trip_path_id: 5,
        trip_id: 2,
        place_id: 22, // Apamea (Category 4)
        time: new Date('2024-07-05T12:00:00Z')
      },
      {
        trip_path_id: 6,
        trip_id: 2,
        place_id: 5, // Al Ghab Plain Forest (Category 3)
        time: new Date('2024-07-05T15:00:00Z')
      },
      {
        trip_path_id: 7,
        trip_id: 3,
        place_id: 8, // Mount Abdulaziz (Category 1)
        time: new Date('2024-07-10T07:30:00Z')
      },
      {
        trip_path_id: 8,
        trip_id: 3,
        place_id: 9, // Al-Karak Restaurant (Category 5)
        time: new Date('2024-07-10T09:00:00Z')
      },
      {
        trip_path_id: 9,
        trip_id: 3,
        place_id: 7, // Deir ez-Zor Bridge (Category 4)
        time: new Date('2024-07-10T11:00:00Z')
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trip_paths', null, {});
  }
};
