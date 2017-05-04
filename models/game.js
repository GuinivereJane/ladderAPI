'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    points: {
      type: DataTypes.INTEGER,
      validate: {isInt: true}
    },
    winnerId: DataTypes.INTEGER,
    winnerFaction: DataTypes.STRING,
    loserFaction: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      Game.belongsToMany(models.User, {through: 'UserGame'});
      Game.hasOne(models.Challenge, {foreignKey:'gameId'});
     // Game.hasOne(models.Challenge);


      }
    }
  });
  return Game;
};