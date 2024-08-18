'use strict';
const bcrypt = require('bcryptjs');

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
    return queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        first_name: 'admin',
        last_name: 'Jacob',
        email: 'admin@gmail.com',
        phone_number: '+9630001111',
        password: await bcrypt.hash('admin1234', 10),
        role_id: 1,
        isVerified: 1,
        isValidated: 1
      },
      {
        user_id: 2,
        first_name: 'guide',
        last_name: 'Henry',
        email: 'guide@gmail.com',
        phone_number: '+9630002222',
        password: await bcrypt.hash('guide1234', 10),
        role_id: 2,
        isVerified: 1,
        isValidated: 1
      },
      {
        user_id: 3,
        first_name: 'user',
        last_name: 'Donald',
        email: 'user@gmail.com',
        phone_number: '+9630003333',
        password: await bcrypt.hash('user1234', 10),
        role_id: 3,
        isVerified: 1,
        isValidated: 1
      },
      {
        user_id: 4,
        first_name: 'guide',
        last_name: 'Samantha',
        email: 'guide1@gmail.com',
        phone_number: '+9630004444',
        password: await bcrypt.hash('guide1234', 10),
        role_id: 2,
        isVerified: 1,
        isValidated: 1
      },
      {
        user_id: 5,
        first_name: 'user5',
        last_name: 'Smith',
        email: 'user5@example.com',
        phone_number: '+9630005555',
        password: await bcrypt.hash('user1234', 10),
        role_id: 3,
        isVerified: 1,
        isValidated: 1,
      },
      {
        user_id: 6,
        first_name: 'user6',
        last_name: 'Johnson',
        email: 'user6@example.com',
        phone_number: '+9630006666',
        password: await bcrypt.hash('user1234', 10),
        role_id: 3,
        isVerified: 1,
        isValidated: 1,
      },
      {
        user_id: 7,
        first_name: 'user7',
        last_name: 'Williams',
        email: 'user7@example.com',
        phone_number: '+9630007777',
        password: await bcrypt.hash('user1234', 10),
        role_id: 3,
        isVerified: 1,
        isValidated: 1,
      },
      {
        user_id: 8,
        first_name: 'user8',
        last_name: 'Brown',
        email: 'user8@example.com',
        phone_number: '+9630008888',
        password: await bcrypt.hash('user1234', 10),
        role_id: 3,
        isVerified: 1,
        isValidated: 1,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
