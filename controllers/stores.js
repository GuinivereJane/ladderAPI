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

    
	router.get('/stores',function (req, res) { 
	  connection.query('SELECT * FROM `stores`',function (error, results, fields) {
	      res.end(JSON.stringify(results));
	   });  
	})

	router.get('/stores/new',function(req, res){
	      res.sendFile( __dirname + "/" + "storesnew.htm" );
	})

	router.post('/stores',urlencodedParser,function(req, res){
	      connection.query('INSERT INTO `stores` (name, address, email, phonenumber) VALUES (?, ?, ?, ?)', 
	         [req.body.name,req.body.address,req.body.email,req.body.phonenumber],
	         function(error,resutls,fields){
	         	console.log("ERROR:"+error);
	            res.redirect('/stores');
	         });
	})

	router.get('/stores/destroy', function(req,res){
	   res.sendFile( __dirname + "/" + "storesdestroy.htm" );

	})
	router.get('/stores/:id', function (req, res) {
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
	})

	router.delete('/stores',urlencodedParser, function(req,res){
	  
	   connection.query('DELETE from `stores` where `id` = ?',[req.body.id],function(error,results,fields){
	      res.redirect('/stores');
	    });
})

    return router;
})();
