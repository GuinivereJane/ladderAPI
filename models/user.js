'use strict';
module.exports = function(sequelize, DataTypes) {
     const crypto = require('crypto');


  var User = sequelize.define('User', {
    firstname:{
      type: DataTypes.STRING,
      validate: {isAlphanumeric: true}
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {isAlphanumeric: true}
    },
    salt: {
      type: DataTypes.BIGINT,
    },
     password: {
      type: DataTypes.STRING,
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

      },
      createPasswordSalt: ()=>{
         let randomValueHex  = (len)=> {
           return crypto.randomBytes(Math.ceil(len/2))
           .toString('hex') // convert to hexadecimal format
            .slice(0,len);   // return required number of characters
        }
        return randomValueHex(34);
        },
      encryptPassword: function(password, salt){
          return crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');
      }
    }
  });
  return User;
};