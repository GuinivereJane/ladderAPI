'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    points: DataTypes.INTEGER,
    winnerId: DataTypes.INTEGER,
    winnerFaction: DataTypes.STRING,
    loserFaction: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      Game.belongsToMany(models.User, {through: 'UserGame'})

      }
    }
  });
  return Game;
};