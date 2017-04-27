

module.exports = (function() {
  'use strict';
   var router = require('express').Router();

var models = require('../models');

var passportJWT = require("passport-jwt");

var passport = require('passport');  
var strategyMod = require("../middleware/authStrategy");
let strategy = strategyMod.strat();
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
	
	const crypto = require('crypto');

	const ExtractJwt = passportJWT.ExtractJwt;
	const JwtStrategy = passportJWT.Strategy;
	const jwt = require('jsonwebtoken');

	let jwtOptions = {}
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
	jwtOptions.secretOrKey = 'tasmanianDevil';


	let user = models.User.findOne({
	  where: {
	    email: req.body.email
	  }
	}).done((user)=>{
		if( ! user ){
	    res.status(401).json({type:"Invalid Login - no user"});
	  }else{

	 		console.log("________________");
		  let salt = user.salt;
		  let decode = crypto.pbkdf2Sync(req.body.password, salt, 100000, 512, 'sha512');
		  console.log(decode.toString('hex'));
		  if(user.password === decode.toString('hex')) {
		    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		    var payload = {id: user.id};
		    var token = jwt.sign(payload, jwtOptions.secretOrKey); 
		    res.json({message: "ok", token: token});
		  } else {
		    res.status(401).json({type:"Invalid Login - password fail"});
		  }

	  }
	 
	});
	
});

    return router;
})();
