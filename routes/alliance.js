module.exports = (function() {
  'use strict';

	const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

	router.get('/alliances',function (req, res) { 
		let chaos = models.Alliance.findById(4);
		let khorne = models.Faction.findById(5);
		console.log(chaos);
		console.log(khorne);

		 models.Alliance.findAll().then((alliances)=>{
		 	res.end(JSON.stringify(alliances))
		 });
	})


	return router;
})();