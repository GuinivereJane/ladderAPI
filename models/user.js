'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname:{
      type: DataTypes.STRING,
      validate: {isAlphanumeric: true}
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {isAlphanumeric: true}
    },
    email:{ 
      type: DataTypes.STRING,
      validate: {isEmail:true}
    },
    phonenumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      User.belongsTo(models.Store)
      User.belongsToMany(models.Game, {through: 'UserGame'})

      }
    }
  });
  return User;
};