const methods = {
	login: function(req, res, next) {
		res.render('loginAngular');
	},
	mainpage: async function(req, res, next) {
		res.render('mainpageAngular');
	}
};

module.exports = methods;