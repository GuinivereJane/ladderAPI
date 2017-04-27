'use strict';
module.exports.strat = ()=> {
 
var models = require('../models');

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let user = models.User.findById(jwt_payload.id).done((user)=>{
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
});


  return strategy;
};