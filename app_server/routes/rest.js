const express = require('express');
const apiRoutes = require('../controllers/restApi');

const router = express.Router();



router
	.route('/concerts')
	.get(apiRoutes.listConcerts);

module.exports = router;
