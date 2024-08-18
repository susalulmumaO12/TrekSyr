'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('places', {
      place_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'cities',
          key: 'city_id'
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'categories',
          key: 'category_id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ar_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING
      },
      ar_description: {
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ar_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT'),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('places');
  }
};