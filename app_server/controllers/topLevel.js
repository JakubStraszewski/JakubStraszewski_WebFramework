"use strict"

const databaseAPI = require('../components/database');


async function retrieveAndDisplay(req, res, next) {
	const req_login = (req.body.login_name != null);
	const req_name = req_login ? req.body.login_name : req.body.signup_name;
	const req_password = req_login ? req.body.login_password : req.body.signup_password;
	const potentialObject = { name: req_name, };
	const result = await databaseAPI.retrieveObjectArray(potentialObject, "user");
	console.log(result.length);
	if (req_login) {
		let auth = false;
		for (let i = 0; i < result.length; i++) {
			if (req_password == result[i].password) {
				auth = true;
				break;
			}
		}
		if (!auth) {
			res.render('error', { message: "Failed to authenticate user.", error: { status: "Invalid username or password.", stack: "Please review the input and try again." } } );
		}
		else {
			res.render('mainpage', { user: `${req_name}`} );
		}
	}
	else
	{
		if (result.length == 0) {
			const User = databaseAPI.findModelById("user");
			const potentiallyAddedUser = new User( potentialObject );
			potentiallyAddedUser.password = req_password;
			databaseAPI.persistObject(potentiallyAddedUser);
			res.render('mainpage', { user: `${req_name}`} );
		}
		else {
			res.render('error', { message: "Failed to add user.", error: { status: "User " + req_name + " already exists.", stack: "Please review the input and try again." } } );
		}
	}
}

const methods = {
	routeDisplay: function(req, res, next) {
		retrieveAndDisplay(req, res, next);
	}, 
};

module.exports = methods;
