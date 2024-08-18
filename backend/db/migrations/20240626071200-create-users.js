'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'role_id'
        },
      },
      isVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isValidated: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
/* 
    await queryInterface.addConstraint('users', {
      fields: ['role'],
      type: 'FOREIGN KEY',
      name: 'fk_users_role_id',
      references: {
        table: 'roles',
        field: 'role_id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }); */
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');

    /* await queryInterface.removeConstraint(
      'users', 
      'fk_users_role_id'
    ); */
  }
};


