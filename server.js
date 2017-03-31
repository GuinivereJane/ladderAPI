
/** next task set up webpack and use es6 classes **/

var express = require('express');
var cors = require('cors');
var methodOverride = require('method-override');


var app = express();
var bodyParser = require('body-parser');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Acess-Control-Allow-Methods","POST, GET, DELETE, OPTIONS");
  next();
});


 
 
 

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//the routes for players 
var players = require('./utils/routes.js');
app.use('/', players);



//This responds with "Hello World" on the homepage


app.listen(8081, function(){
  console.log('ladderAPI running...');

})