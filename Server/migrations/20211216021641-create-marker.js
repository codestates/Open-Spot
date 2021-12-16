'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Markers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      callNum: {
        type: Sequelize.STRING
      },
      tagName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Markers');
  }
};
