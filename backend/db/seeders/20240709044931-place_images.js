'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('place_images', [
      { place_id: 1, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 2, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 3, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 4, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 5, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 6, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 7, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 8, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 9, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 10, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 11, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 12, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 13, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      { place_id: 14, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg" },
      { place_id: 15, image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg" },
      {
        place_id: 16,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 17,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      },
      {
        place_id: 18,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 19,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 20,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 21,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      },
      {
        place_id: 22,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 23,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      },
      {
        place_id: 24,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 25,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      },
      {
        place_id: 26,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 27,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      },
      {
        place_id: 28,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966119.jpg"
      },
      {
        place_id: 29,
        image_path: "..\\..\\..\\public\\places\\placeImages-1720086894597-181966120.jpg"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('place_images', null, {});
  }
};
