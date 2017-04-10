module.exports = (function() {
  'use strict';

	const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

	router.get('/games',function (req, res) { 
		 models.Game.findAll().then((games)=>{
		 	res.end(JSON.stringify(games))
		 });
	})

	router.post('/games',urlencodedParser,function(req, res){
console.log(req.body)
		let winner = models.User.findById(req.body.winnerId);
		let loser = models.User.findById(req.body.loserId);
		let game = models.Game.create({points: req.body.points,
												winnerId: req.body.winnerId,
												winnerFaction: req.body.winnerFaction,
												loserFaction: req.body.loserFaction});

		Promise.all([winner,loser,game]).then((values)=>{
				let winner = values[0];
				let loser = values[1];
				let game = values[2];
								console.log(values[2].points)

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

	router.delete('/games/:id',urlencodedParser, function(req,res){
	   models.Game.destroy({
		  where: {
		    id: req.params.id
		  }
		});
	  res.end();
	})

	return router;
})();