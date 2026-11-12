'use strict';

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      subscribers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      subscribes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
