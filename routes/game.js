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
		

		let winner = null;
		if (req.body.source == "new"){
			winner = models.User.findById(req.body.winnerId);
		}

		if (req.body.source == "log"){
			let winnerSplit = req.body.winnerId.split(' ');
			let winnerFirstName = winnerSplit[0];
			let winnerLastName = winnerSplit[1];

			 winner = models.User.find({
					where: {
	    			firstname: winnerFirstName,
	    			lastname: winnerLastName,
	  			}
				});
		}

		let loserSplit = req.body.loserId.split(' ');
		let loserFirstName = loserSplit[0];
		let loserLastName = loserSplit[1];

		let loser = models.User.find({
				where: {
    			firstname: loserFirstName,
    			lastname: loserLastName,
  			}
			});

		Promise.all([winner,loser]).then((values)=>{
				
				let winner = values[0];
				let loser = values[1];

				if (winner != null && loser != null){

					let game = models.Game.create({points: req.body.points,
													winnerId: winner.id,
													winnerFaction: req.body.winnerFaction,
													loserId:loser.id,
													loserFaction: req.body.loserFaction});
					game.catch((e)=>{
			  		let errors = e.errors.map((error)=>{
			  			return {type:error.type, path:error.path}
			  		});
		  		 	res.status(400).send(errors);
		  		}).then((game)=>{
		  			winner.addGame(game);
						loser.addGame(game);
		  		}).then(()=>{
		  			//if this is a loged game, update the challenge status
		  			if (req.body.source == "log"){
		  				let challenge = models.Challenge.findById(req.body.challengeId)
		  					.then((challenge)=>{challenge.update({complete:true})});
		  				
		  			}

		  		});
			}else{
				res.status(400).send([{type:"Invalid Game Submisson"}]);
			}

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