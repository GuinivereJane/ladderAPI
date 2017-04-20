//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();

var models = require('../models');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var passport = require('passport');  

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var _ = require("lodash");

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

router.use(passport.initialize());

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//******** PLAYER ROUTES **************//


router.get('/', function (req, res) {
   res.send('HOME');
});
router.get("/secret", passport.authenticate('jwt', { session: false }),
 function(req, res){console.log(req.user.id);
  res.json("Success! You can not see this without a token");
});


var users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];



router.post("/login", function(req, res) {
	console.log('hello');
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  console.log(name);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    

    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

    return router;
})();
