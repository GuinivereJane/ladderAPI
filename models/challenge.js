'use strict';
module.exports = function(sequelize, DataTypes) {

  var nodemailer = require("nodemailer");

  var Challenge = sequelize.define('Challenge', {
    // challenged:{
    //   type: DataTypes.INTEGER,
    // },
    // challenger: {
    //   type: DataTypes.INTEGER,
    // },
    accepted: {
      type: DataTypes.BOOLEAN,
    },
     complete: {
      type: DataTypes.BOOLEAN,
    },
    gameId:{ 
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Challenge.belongsTo(models.User, {as:'challenger'});
        Challenge.belongsTo(models.User, {as:'challenged'});
        Challenge.belongsTo(models.Game, {as:'game'});

      },
      
      
    },
    instanceMethods:{
      sendChallengeEmail: ()=>{
        console.log("send Challenge")
      }
    }
  });
  return Challenge;
};