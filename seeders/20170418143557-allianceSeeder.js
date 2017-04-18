'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        let date=new Date();

 return queryInterface.bulkInsert('Alliances', [
      { name:"Chaos",  createdAt: date, updatedAt: date },
      { name:"Order",  createdAt: date, updatedAt: date },
      { name:"Death",  createdAt: date, updatedAt: date },
      { name:"Destructioin",  createdAt: date, updatedAt: date },


    ],{});
  },

  down: function (queryInterface, Sequelize) {
            return queryInterface.bulkDelete('Alliances', null, {});

  }
};
