'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      trip_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      guide_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      info: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_info: {
        allowNull: false,
        type: Sequelize.STRING
      },
      starting_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ending_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      gathering_place: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_gathering_place: {
        allowNull: false,
        type: Sequelize.STRING
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      closing_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trips');
  }
};