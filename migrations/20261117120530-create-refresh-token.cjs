'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING(255),
      allowNull: false,
    })

    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      tokenHash: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('refresh_tokens')

    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING(30),
      allowNull: false,
    })
  },
}