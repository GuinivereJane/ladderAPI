module.exports = (function() {
  'use strict';
   const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

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
  	}).catch((e)=>{
  		console.log(e);
  		let errors = e.errors.map((error)=>{
  			return {type:error.type, path:error.path}
  		});

  		res.status(400).send(errors);
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

	router.get('/users/:id/stores',(req,res)=>{
		models.User.findById(req.params.id).then((user)=>{
			user.getStore().then((store)=>{
				res.end(JSON.stringify(store));
			})
		});
	});

	router.delete('/users/:id/:stores/:shopId',(req,res)=>{
		//remove a store from a player
				let user = models.User.findById(req.params.id);
				let shop = models.Store.findById(req.params.shopId);
				Promise.all([user,shop])
					.then((values)=>{

						// let user = values[0];
						// let shop = values[1];

						values[1].removeUser(values[0])
							.then(()=>{res.end()});		
					});
		
	});

	router.post('/users/:id/stores/:shopId',(req,res)=>{
		//add a player to a 
				let user = models.User.findById(req.params.id);
				let shop = models.Store.findById(req.params.shopId);

				Promise.all([user,shop])
					.then((values)=>{
						values[0].setStore(values[1])
							.then(()=>{res.end()});		
					});
		
	});
	return router;
})();