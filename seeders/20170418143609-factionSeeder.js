'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
           let date=new Date();


   return queryInterface.bulkInsert('Factions', [
      { name:"Stormcast Eternals",  createdAt: date, updatedAt: date, AllianceId:2},
      { name:"Sylvaneth",  createdAt: date, updatedAt: date, AllianceId:2 },
      { name:"Kharadron Overlords",  createdAt: date, updatedAt: date, AllianceId:2 },
      { name:"Tzeentch",  createdAt: date, updatedAt: date , AllianceId:1},
      { name:"Khorne",  createdAt: date, updatedAt: date, AllianceId:1 },
      { name:"Clan Pestilence",  createdAt: date, updatedAt: date, AllianceId:1 },
      { name:"Beastclaw Radiers",  createdAt: date, updatedAt: date, AllianceId:4 },
      { name:"Ironjaws",  createdAt: date, updatedAt: date , AllianceId:4},
      { name:"Bonespliterz",  createdAt: date, updatedAt: date, AllianceId:4 },
      { name:"Flesh Eater Courts",  createdAt: date, updatedAt: date, AllianceId:3 },



    ],{});
  },

  down: function (queryInterface, Sequelize) {
            return queryInterface.bulkDelete('Factions', null, {});

  }
};
