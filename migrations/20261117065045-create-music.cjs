'use strict';

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('music', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },

      description: {
        type: DataTypes.STRING(500),
        allowNull: true
      },

      audio: {
        type: DataTypes.STRING,
        allowNull: false
      },

      albumImage: {
        type: DataTypes.STRING,
        allowNull: true
      },

      album: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('music')
  }
};
