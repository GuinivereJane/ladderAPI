'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = require('./user');

  var nodemailer = require("nodemailer");
  
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
  });

  var Challenge = sequelize.define('Challenge', {
    challengedId:{
      type: DataTypes.INTEGER,
    },
    challengerId: {
      type: DataTypes.INTEGER,
    },
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
      sendChallengeEmail: function(challenge){


        var mailOptions={
          to : process.env.EMAIL,
          subject : "test",
          text : `${process.env.BACKURL}/challenge/${id}/accept`
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            console.log(error);
          }else{
            console.log("Message sent");
          }
        });

      }
    }
  });
  return Challenge;
};