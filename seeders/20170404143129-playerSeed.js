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
    return queryInterface.bulkInsert('Users', [
      { firstname: "Guin" ,lastname:"Kellam", email:"G2g.g", phonenumber:"343-343-3434", createdAt:date, updatedAt:date },
      { firstname: "Morgana" ,lastname:"Kellam", email:"M@M.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
      { firstname: "Lorelei" ,lastname:"Kellam", email:"L@L.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
      { firstname: "Abigail" ,lastname:"Bunscasan", email:"A@A.g", phonenumber:"343-343-3434", createdAt: date, updatedAt: date },
    ],{});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
