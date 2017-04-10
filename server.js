//node_modules/.bin/sequelize
/** next task set up webpack and use es6 classes **/

var express = require('express');
var cors = require('cors');
var methodOverride = require('method-override');

var app = express();
var bodyParser = require('body-parser');

var models = require('./models');

app.use(methodOverride('_method'))
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Acess-Control-Allow-Methods","POST, GET, DELETE, OPTIONS");
  next();
});


var urlencodedParser = bodyParser.urlencoded({ extended: false })

var user = require('./routes/user.js');
app.use('/', user);

var store = require('./routes/store.js');
app.use('/', store);

var game = require('./routes/game.js');
app.use('/', game);

var home = require('./routes/home.js');
app.use('/', home);




//This responds with "Hello World" on the homepage

models.sequelize.sync().then(function() {
	app.listen(8081, function(){
	  console.log('ladderAPI running...');
	})
});