//this is a super simple API for players, at some point soon build a player model !


module.exports = (function() {
  'use strict';
   var router = require('express').Router();


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

	router.get('/players',function (req, res) { 


	  pool.getConnection(function(err, connection) {
	  	 if (err) {
          // connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }   
 
         console.log('connected as id ' + connection.threadId);
		  connection.query('SELECT * FROM `users`',function (error, results, fields) {
		    res.end(JSON.stringify(results));
		  });  
			queryError(err);
		  connection.release();
		});

	})
	router.get('/players/new',function(req, res){
	      res.sendFile( __dirname + "/" + "usersnew.htm" );
	})

	router.post('/players',urlencodedParser,function(req, res){
	    pool.getConnection(function(err, connection) {
	      connection.query('INSERT INTO `users` (firstname, lastname, email) VALUES (?, ?, ?)', 
	         [req.body.firstname,req.body.lastname,req.body.email],
	         function(error,resutls,fields){
	            res.redirect('/players');
	         });
	      connection.release();
			});
	})

	router.get('/players/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "userssdestroy.htm" );

	})
	router.get('/players/:id', function (req, res) {
	  pool.getConnection(function(err, connection) {

		  connection.query('SELECT * FROM `users` WHERE `id` = ?', [req.params.id],function (error, results, fields) {
		    var result = results[0];
		    response = {
		      first_name:result.firstname,
		      last_name:result.lastname,
		      email:result.email
		   };
		   res.end(JSON.stringify(response));
		   });
	  	connection.release();
		});
	})

	router.delete('/players',urlencodedParser, function(req,res){
	  pool.getConnection(function(err, connection) {

	   connection.query('DELETE from `users` where `id` = ?',[req.body.id],function(error,results,fields){
	      res.redirect('/players');
	    });

	   connection.release();
			});
})
router.delete('/players/:id',urlencodedParser, function(req,res){  
	   connection.query('DELETE from `users` where `id` = ?',[req.params.id],function(error,results,fields){
	      res.end();
	    });
})


//**************STORE ROUTES *******************//
router.get('/stores',function (req, res) { 
	  
	 pool.getConnection(function(err, connection) {

	  connection.query('SELECT * FROM `stores`',function (error, results, fields) {
	      res.end(JSON.stringify(results));
	   });  

	  connection.release();
			});
	})

	router.get('/stores/new',function(req, res){
	      res.sendFile( __dirname + "/" + "storesnew.htm" );
	})

	router.post('/stores',urlencodedParser,function(req, res){
	   pool.getConnection(function(err, connection) {

	      connection.query('INSERT INTO `stores` (name, address, email, phonenumber) VALUES (?, ?, ?, ?)', 
	         [req.body.name,req.body.address,req.body.email,req.body.phonenumber],
	         function(error,resutls,fields){
	         	console.log("ERROR:"+error);
	            res.redirect('/stores');
	         });

	      connection.release();
			});
	})

	router.get('/stores/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "storesdestroy.htm" );

	})
	router.get('/stores/:id', function (req, res) {
	  pool.getConnection(function(err, connection) {


	  connection.query('SELECT * FROM `stores` WHERE `id` = ?', [req.params.id],function (error, results, fields) {
	    var result = results[0];
	    response = {
	      name:result.name,
	      address:result.address,
	      email:result.email,
	      phonenumber:result.phonenumber
	   };
	   res.end(JSON.stringify(response));
	   });

	  connection.release();
			});
	})

	router.delete('/stores',urlencodedParser, function(req,res){
	  	    pool.getConnection(function(err, connection) {

	   connection.query('DELETE from `stores` where `id` = ?',[req.body.id],function(error,results,fields){
	      res.redirect('/stores');
	    });

	   connection.release();
			});
})

router.get('/', function (req, res) {
   res.send('HOME');
})

    return router;
})();
