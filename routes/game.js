module.exports = (function() {
  'use strict';

	const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

	var passport = require('passport');  
	var strategyMod = require("../middleware/authStrategy");
	let strategy = strategyMod.strat();
	passport.use(strategy);
	router.use(passport.initialize());

	router.get('/games',function (req, res) { 
		 models.Game.findAll().then((games)=>{
		 	res.end(JSON.stringify(games))
		 });
	})

	router.post('/games',passport.authenticate('jwt', { session: false }),
							urlencodedParser,function(req, res){
		let winner = models.User.findById(req.body.winnerId);
		let loser = models.User.findById(req.body.loserId);
		let game = models.Game.create({points: req.body.points,
												winnerId: req.body.winnerId,
												winnerFaction: req.body.winnerFaction,
												loserFaction: req.body.loserFaction});

		game.catch((e)=>{

  		let errors = e.errors.map((error)=>{
  			return {type:error.type, path:error.path}
  		});
  		 res.status(400).send(errors);
  	});

		Promise.all([winner,loser,game]).then((values)=>{
				let winner = values[0];
				let loser = values[1];
				let game = values[2];
								//console.log(values[2].points)

				winner.addGame(game);
				loser.addGame(game);

			res.end();
		})
	
	})


	router.get('/games/:id', function (req, res) {
		models.Game.findById(req.params.id).then((game)=>{
			res.end(JSON.stringify(game));
		})
	})

	router.delete('/games/:id', function(req,res){
	   models.Game.destroy({
		  where: {
		    id: req.params.id
		  }
		});
	  res.end();
	})

	return router;
})();