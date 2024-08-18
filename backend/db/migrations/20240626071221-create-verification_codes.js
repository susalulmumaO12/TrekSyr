'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('verification_codes', {
      code_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Make sure this is the correct table name
          key: 'user_id', // Make sure this is the correct column name
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      expiry_date: { // Fix typo from 'expiary_date' to 'expiry_date'
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('verification_codes');
  }
};
