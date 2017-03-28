//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();
	
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'ladder'
});
	var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

    
	router.get('/players',function (req, res) { 
	  connection.query('SELECT * FROM `users`',function (error, results, fields) {
	      console.log(results);
	      res.end(JSON.stringify(results));
	   });  
	})
	router.get('/players/new',function(req, res){
	      res.sendFile( __dirname + "/" + "usersnew.htm" );
	})

	router.post('/players',urlencodedParser,function(req, res){
	      connection.query('INSERT INTO `users` (firstname, lastname, email) VALUES (?, ?, ?)', 
	         [req.body.firstname,req.body.lastname,req.body.email],
	         function(error,resutls,fields){
	            res.redirect('/players');
	         });
	})

	router.get('/players/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "userssdestroy.htm" );

	})
	router.get('/players/:id', function (req, res) {
	  connection.query('SELECT * FROM `users` WHERE `id` = ?', [req.params.id],function (error, results, fields) {
	    var result = results[0];
	    response = {
	      first_name:result.firstname,
	      last_name:result.lastname,
	      email:result.email
	   };
	   res.end(JSON.stringify(response));
	   });
	})

	router.delete('/players',urlencodedParser, function(req,res){
	  
	   connection.query('DELETE from `users` where `id` = ?',[req.body.id],function(error,results,fields){
	      res.redirect('/players');
	    });
})
router.delete('/players/:id',urlencodedParser, function(req,res){  
	   connection.query('DELETE from `users` where `id` = ?',[req.params.id],function(error,results,fields){
	      res.end();
	    });
})
    return router;
})();
