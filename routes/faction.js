module.exports = (function() {
  'use strict';

	const router = require('express').Router();

	const models = require('../models');
	const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: false })

	router.get('/factions',function (req, res) { 
		 models.Faction.findAll().then((factions)=>{
		 	res.end(JSON.stringify(factions))
		 });
	})


	return router;
})();