'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      winnerId: {
        type: Sequelize.INTEGER
      },
      winnerFaction: {
        type: Sequelize.STRING
      },
      loserFaction: {
        type: Sequelize.STRING
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

  down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Games');

  }
};
