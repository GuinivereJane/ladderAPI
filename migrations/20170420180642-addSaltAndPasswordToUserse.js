'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   queryInterface.addColumn(
    'Users',
    'salt',
    Sequelize.STRING(1000)
  );
  queryInterface.addColumn(
    'Users',
    'password',
    Sequelize.STRING(1000)
  );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
