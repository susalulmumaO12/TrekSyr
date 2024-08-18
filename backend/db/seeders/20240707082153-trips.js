'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('trips', [
      {
        trip_id: 1,
        guide_id: 2,
        name: 'Historical Damascus Tour',
        ar_name: 'رحلة تاريخية في دمشق',
        price: 50.0,
        info: 'A tour through the historical landmarks of Damascus',
        ar_info:'رحلة في معالم دمشق التاريخية',
        starting_time: new Date('2024-07-01T08:00:00Z'),
        ending_time: new Date('2024-07-01T18:00:00Z'),
        gathering_place: 'Bab Sharqi, Damascus',
        ar_gathering_place: 'باب شرقي, دمشق',
        capacity: 20,
        closing_date: new Date('2024-06-30T23:59:59Z'),
        image: '..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg'
      },
      {
        trip_id: 2,
        guide_id: 2,
        name: 'Aleppo Culinary Experience',
        ar_name: 'تجربة المطبخ الحلبي',
        price: 75.0,
        info: 'Explore the culinary delights of Aleppo',
        ar_info: 'استكشاف أطباق المطبخ الحلبي',
        starting_time: new Date('2024-07-05T09:00:00Z'),
        ending_time: new Date('2024-07-05T17:00:00Z'),
        gathering_place: 'Aleppo Citadel',
        ar_gathering_place: 'قلعة حلب',
        capacity: 15,
        closing_date: new Date('2024-07-04T23:59:59Z'),
        image: '..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg'
      },
      {
        trip_id: 3,
        guide_id: 4,
        name: 'Hiking in Al Ghab Plain Forest',
        ar_name: 'رحلة مشي في غابة سهل الغاب',
        price: 30.0,
        info: 'A refreshing hike through Al Ghab Plain Forest',
        ar_info: 'رحلة مشي منعشة في غابة سهل الغاب',
        starting_time: new Date('2024-07-10T07:00:00Z'),
        ending_time: new Date('2024-07-10T12:00:00Z'),
        gathering_place: 'Al Ghab Plain Forest Entrance',
        ar_gathering_place: 'مدخل غابة سهل الغاب',
        capacity: 25,
        closing_date: new Date('2024-07-09T23:59:59Z'),
        image: '..\\..\\..\\public\\places\\placeImages-1720086894597-181966121.jpg'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trips', null, {});
  }
};
