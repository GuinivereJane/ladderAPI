//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();

var models = require('../models');

	/***************************************MY SQL CODE*****************************************/
	var mysql      = require('mysql');
	
var pool  = mysql.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'ladder',
	  connectionLimit : 1000

});

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


	router.get('/users',function (req, res) { 
	//console.log(__dirname);

	  models.User.findAll().then(function(users) {
	   	res.end(JSON.stringify(users));
	  });
	})
	router.get('/users/new',function(req, res){
	      res.sendFile( __dirname + "/" + "usersnew.htm" );
	})

	router.post('/users',urlencodedParser,function(req, res){

		models.User.create({firstname: req.body.firstname,
												lastname: req.body.lastname,
												email: req.body.email,
												phonenumber: req.body.phonenumber
		}).then(function() {
    	res.end();
  	});
	 
	})
	router.get('/users/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "usersdestroy.htm" );

	})
	router.get('/users/:id', function (req, res) {
		models.User.findById(req.params.id).then((user)=>{
			res.end(JSON.stringify(user));
		})
	})

	router.delete('/users',urlencodedParser, function(req,res){
		models.User.destroy({
		  where: {
		    id: req.body.id
		  }
		});
		res.redirect('/users');
})
router.delete('/users/:id',urlencodedParser, function(req,res){  
	  models.User.destroy({
		  where: {
		    id: req.params.id
		  }
		});
	  res.end();
})


//**************STORE ROUTES *******************//
router.get('/stores',function (req, res) { 
	 models.Store.findAll().then((stores)=>{
	 	res.end(JSON.stringify(stores))
	 });
})

	router.get('/stores/new',function(req, res){
	      res.sendFile( __dirname + "/" + "storesnew.htm" );
	})

	router.post('/stores',urlencodedParser,function(req, res){
	  models.Store.create({name: req.body.name,
												address: req.body.address,
												phonenumber: req.body.phonenumber,
												email: req.body.email
		}).then(function() {
    	res.end();
  	});
	})

	router.get('/stores/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "storesdestroy.htm" );

	})
	router.get('/stores/:id', function (req, res) {
		models.Store.findById(req.params.id).then((store)=>{
			res.end(JSON.stringify(store));
		})
	})

	router.delete('/stores/:id',urlencodedParser, function(req,res){
	   models.Store.destroy({
		  where: {
		    id: req.params.id
		  }
		});
	  res.end();
})
	router.delete('/stores',urlencodedParser, function(req,res){
	   models.Store.destroy({
		  where: {
		    id: req.body.id
		  }
		});
	  res.end();
})

router.get('/', function (req, res) {
   res.send('HOME');
})

    return router;
})();
