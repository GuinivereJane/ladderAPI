
module.exports = (function() {
  'use strict';
   const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

	//code to set up authroizeation middleware
	const passport = require('passport');  
	const strategyMod = require("../middleware/authStrategy");
	const strategy = strategyMod.strat();
	passport.use(strategy);
	router.use(passport.initialize());


router.get('/stores',function (req, res) { 
	 models.Store.findAll().then((stores)=>{
	 	res.end(JSON.stringify(stores))
	 });
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
	

router.get('/stores/:id/users',(req,res)=>{
		models.Store.findById(req.params.id).then((store)=>{
			store.getUsers().then((users)=>{
				res.end(JSON.stringify(users));
			})
	});
});

	return router;
})();