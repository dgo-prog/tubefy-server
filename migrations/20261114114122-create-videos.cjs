'use strict';

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('videos', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },

      video: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      preview: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('videos')
  }
};
