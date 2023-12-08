"use strict"

const databaseAPI = require('../components/database');
const crypto = require('crypto');

const methods = {
	validateLogin: async function (username, password, outProc) {
		const potentialObject = { name: username, };
		const result = await databaseAPI.retrieveObjectArray(potentialObject, "user");
		if (result.length < 1) { console.log("Error: User not found."); return outProc(null, false, { message: "Error: User not found." } ); }
		crypto.pbkdf2(password, "sjredl4331daergs45", 310000, 32, 'sha256', function(err, hashedPassword) {
			if (err) { console.log(`Error: ${err}`); return outProc(err); }
			for (let i = 0; i < result.length; i++) {
				if (crypto.timingSafeEqual(Buffer.alloc(Buffer.from(hashedPassword.toString()).length, result[i].password), Buffer.from(hashedPassword.toString()))) {
					return outProc(null, result[i]);
				}
			}
			return outProc(null, false, { message: "Error: Password not matched." } );
		});
	},
	validateRegistration: async function(req, res, next) {
		const potentialObject = { name: req.body.signup_name, };
		const result = await databaseAPI.retrieveObjectArray(potentialObject, "user");
		if (result.length == 0) {
			const User = databaseAPI.findModelById("user");
			const potentiallyAddedUser = new User( potentialObject );
			crypto.pbkdf2(req.body.signup_password, "sjredl4331daergs45", 310000, 32, 'sha256', function(err, hashedPassword) {
				if (err) { 
					console.log("Error while encoding: " + err); 
				}
				potentiallyAddedUser.password = hashedPassword.toString();
				databaseAPI.persistObject(potentiallyAddedUser);
				res.redirect('/');
			});
			
		}
		else {
			res.render('error', { message: "Failed to add user.", error: { status: "User " + req.body.signup_name + " already exists.", stack: "Please review the input and try again." } } );
		}
	},
	
	register: function(req, res, next) {
		methods.validateRegistration(req, res, next);	
	},
	mainpage: async function(req, res, next) {
		const concerts = await databaseAPI.retrieveObjectArray( { }, "concert");
		const concertStr = []
		for (let i = 0; i < concerts.length; i++) {
			concertStr.push(`	
				${concerts[i].title} -
				Due on ${concerts[i].date}
				at EUR${concerts[i].price}
			`);
		}
		console.log(concerts, concertStr);
		res.render('mainpage', { concerts: concertStr });
	}
};

module.exports = methods;
