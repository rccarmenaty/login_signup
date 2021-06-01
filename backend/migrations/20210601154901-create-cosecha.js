'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cosechas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      novedades: {
        type: Sequelize.STRING
      },
      produccion: {
        type: Sequelize.STRING
      },
      fecha_cosecha: {
        type: Sequelize.DATE
      },
      fecha_molienda: {
        type: Sequelize.DATE
      },
      fecha_caducidad: {
        type: Sequelize.DATE
      },
      fecha_preparacion: {
        type: Sequelize.DATE
      },
      fuente: {
        type: Sequelize.STRING
      },
      cantidad_semillas: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cosechas');
  }
};