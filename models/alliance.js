'use strict';
module.exports = function(sequelize, DataTypes) {
  var Alliance = sequelize.define('Alliance', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Alliance.hasMany(models.Faction)

      }
    }
  });
  return Alliance;
};