//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();
 //var crypto = require('crypto');

var models = require('../models');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var passport = require('passport');  

const crypto = require('crypto');

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



function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}


router.post("/login", function(req, res) {
	console.log('hello');
 
  let email = req.body.email;
  let password = req.body.password;
  let salt = randomValueHex(34);


	crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
	  if (err) throw err;
	  console.log(key.toString('hex'));  // '3745e48...aa39b34'
	});
  console.log(email)

let test = crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
	  if (err) throw err;
	  return key.toString('hex');  // '3745e48...aa39b34'
	});
console.log(test);
	var user = models.User.findOne({
	  where: {
	    email: email
	  }
	}).done((user)=>{
		if( ! user ){
	    res.status(401).json({type:"Invalid Login"});
	  }
	  if(user.password === req.body.password) {
	    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
	    var payload = {id: user.id};
	    var token = jwt.sign(payload, jwtOptions.secretOrKey); 
	    res.json({message: "ok", token: token});
	  } else {
	    res.status(401).json({type:"Invalid Login"});
	  }
	});
	
});

    return router;
})();
