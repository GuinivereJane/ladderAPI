//node_modules/.bin/sequelize
/** next task set up webpack and use es6 classes **/
require('dotenv').config();

var express = require('express');
var cors = require('cors');
var methodOverride = require('method-override');

var _ = require("lodash");

var app = express();
var bodyParser = require('body-parser');


var models = require('./models');

app.use(methodOverride('_method'))
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

// Log requests to console
//app.use(morgan('dev'));  

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Acess-Control-Allow-Methods","POST, GET, DELETE, OPTIONS");
  next();
});


var jwt = require('jsonwebtoken');
var passport = require('passport');  


var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var _ = require("lodash");

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

var strategyMod = require("./middleware/authStrategy");
strategy = strategyMod.strat();
passport.use(strategy);

app.use(passport.initialize());



var urlencodedParser = bodyParser.urlencoded({ extended: false })

var user = require('./routes/user.js');
app.use('/', user);

var challenge = require('./routes/challenge.js');
app.use('/', challenge);

var faction = require('./routes/faction.js');
app.use('/', faction);

var alliance = require('./routes/alliance.js');
app.use('/', alliance);

var store = require('./routes/store.js');
app.use('/', store);

var game = require('./routes/game.js');
app.use('/', game);

var home = require('./routes/home.js');
app.use('/', home);





models.sequelize.sync().then(function() {
	app.listen(8081, function(){
	  console.log('ladderAPI running...');
	})
});

module.exports = app; // for testing
