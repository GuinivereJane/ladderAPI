'use strict';
module.exports = function(sequelize, DataTypes) {
  var Faction = sequelize.define('Faction', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      Faction.belongsTo(models.Alliance, {foreignKey: "AllianceId"})

      }
    }
  });
  return Faction;
};