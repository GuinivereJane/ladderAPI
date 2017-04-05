//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();

var models = require('../models');

	/***************************************MY SQL CODE*****************************************/
// 	var mysql      = require('mysql');
	
// var pool  = mysql.createPool({
// 	  host     : 'localhost',
// 	  user     : 'root',
// 	  database : 'ladder',
// 	  connectionLimit : 1000

// });

// 	var connection = mysql.createConnection({
// 	  host     : 'localhost',
// 	  user     : 'root',
// 	  database : 'ladder'
// });

	/*******************************************************************************************/


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//******** PLAYER ROUTES **************//

function queryError(err){
     	if (err){	
     		console.log('Error while performing Query.');
     	}
}


	




router.get('/', function (req, res) {
   res.send('HOME');
})

    return router;
})();
