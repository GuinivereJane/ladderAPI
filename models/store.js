'use strict';
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Store.hasMany(models.User)

      }
    }
  });

  return Store;
};