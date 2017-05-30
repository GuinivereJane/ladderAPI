module.exports = (function() {
  'use strict';

	const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/challenge/:id/accept',(req,res)=>{
	let challenge = models.Challenge.findById(req.params.id)
							.then((challenge)=>{
								if (challenge.accepted == true){
									res.status(400).send([{type:"this challenge has allready been accepted"}])
								}else{
									challenge.update({accepted: true}).then((challenge)=>{res.send(challenge)})	
								}
								}).catch((e)=>{res.status(400).send([{type:"Challenge not found"}])});


  });

//report a challenge game as complete
	router.post('/challenge/:id/game/',urlencodedParser,(req,res)=>{
		
		//get the 
		let challenge = models.Challenge.findById(req.params.id)
		//	build a new game and associate winner and loser with it
			let game = models.Game.create({points: req.body.points,
														winnerId: req.body.winnerId,
														winnerFaction: req.body.winnerFaction,
														loserFaction: req.body.loserFaction}).catch((e)=>{
															console.log(e);
															res.status(400).send(e);
														});

			Promise.all([challenge,game]).then((values)=>{
						let challenge = values[0];
						let game = values[1];
				 if ((challenge.accepted) && !(challenge.complete))  {
						models.User.findById(req.body.winnerId).then((user)=>{user.addGame(game.id)});
						models.User.findById(req.body.loserId).then((user)=>{user.addGame(game.id)});

						challenge.complete = true;
						challenge.setGame(game.get().id);

						challenge.save().then((challenge)=>{
							res.send(JSON.stringify(challenge))
						}).catch((e)=>{
								console.log(e);
								res.status(400).send(e);
							});
					}else{
						if (challenge.complete){
							res.status(400).send(JSON.stringify({type:'The results for this game have allready been logged'}));
						}else{
							res.status(400).send(JSON.stringify({type:'Challenge must be accepted before results are submited'}));
						}
					}

			});


		
	});

	router.get('/challenge/:id',(req,res)=>{
		models.Challenge.findById(req.params.id).then((challenge)=>{
			res.send(challenge);
		}).catch((e)=>{
			console.log(e);
			res.status(400).send(e);
		})
	});

	router.get('/challenges',function (req, res) { 
		

		 models.Challenge.findAll().then((challenge)=>{
		 	res.end(JSON.stringify(challenge))
		 });

	})



	//create a new challenge and accosiate challenger and challenged.
	router.get('/challenge/:challengerId/:challengedId',(req,res)=>{
		let challenge = models.Challenge.create({accepted: false,
												complete: false}).then((challenge)=>{
													challenge.setChallenger(req.params.challengerId);
												  challenge.setChallenged(req.params.challengedId);
													
													challenge.sendChallengeEmail(challenge.id);
												  res.send(JSON.stringify(challenge.get()));
												 }).catch((e)=>{
												 		console.log(e);
												 		res.status(400).send(e);
												 });

	});



//get end point to accept a game.
	router.post('/challenge/:id',urlencodedParser,(req,res)=>{
		let challenge = models.Challenge.findById(req.params.id).then((challenge)=>{
					challenge.accepted = true;
					challenge.save().then((challenge)=>{
						res.send(JSON.stringify(challenge))
					});

		});
	});







		router.get('/challengeTest',function (req, res) { 
		

		let challenge = models.Challenge.create({accepted: false,
												complete: false}).then((challenge)=>{
													challenge.setChallenger(11);
												  challenge.setChallenged(10);
												  challenge.setGame(26);
													console.log('here');
													res.send(JSON.stringify(challenge));
												});

		
		// 	res.end();
		// 	}).catch((e)=>{
  // 		//console.log(e);
  		

  // 		res.status(400);
  // 	});
	 
		 
	})


	return router;
})();