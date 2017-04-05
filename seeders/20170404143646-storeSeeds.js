'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let date=new Date();

    return queryInterface.bulkInsert('Stores', [
      { name: "Dueling Grounds" ,address:"Toronto", email:"D@D.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
      { name: "Meeple Mart" ,address:"Toronto", email:"MM@MM.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
      { name: "Game Chamber" ,address:"London", email:"GC@GC.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
    ],{});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Store', null, {});

  }
};
