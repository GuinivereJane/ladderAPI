'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        let date=new Date();

 return queryInterface.bulkInsert('Games', [
      { points: 2000 ,winnerFaction:"Khorne Deamons", loserFaction:"Soul Blight", winnerId:1, createdAt: date, updatedAt: date },
      { points: 1000 ,winnerFaction:"Tzeentch Deamons", loserFaction:"Stromcast Eternals", winnerId:1, createdAt: date, updatedAt: date },

    ],{});
  },

  down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Games', null, {});

  }
};
