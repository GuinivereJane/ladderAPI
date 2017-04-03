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

//the routes for players 
var routes = require('./routes/routes.js');
app.use('/', routes);



//This responds with "Hello World" on the homepage

models.sequelize.sync().then(function() {
	app.listen(8081, function(){
	  console.log('ladderAPI running...');
	})
});