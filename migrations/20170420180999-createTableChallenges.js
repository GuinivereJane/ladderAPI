'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.createTable('Challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challengerId: {
        type: Sequelize.INTEGER
      },
      challengedId: {
        type: Sequelize.INTEGER
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      gameId: {
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

  down: function (queryInterface, Sequelize) {
           return queryInterface.dropTable('Challenges');

  }
};
