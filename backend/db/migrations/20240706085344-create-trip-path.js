'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trip_paths', {
      trip_path_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'trips',
          key: 'trip_id'
        }
      },
      place_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'places',
          key: 'place_id'
        }
      },
      time: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trip_paths');
  }
};