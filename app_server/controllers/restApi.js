"use strict"

const databaseAPI = require('../components/database');

const methods = {
	listConcerts: async function(req, res) {
		const concertArray = await databaseAPI.retrieveObjectArray({ }, "concert");
		res.json(concertArray);
	}, 
};

module.exports = methods;
