"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Users", {
      uuid: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_full_name: { type: DataTypes.STRING, allowNull: false },
      user_name: { type: DataTypes.STRING, allowNull: false },
      user_email: { type: DataTypes.STRING, allowNull: false },
      user_password: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
