const express = require('express');
const router = express.Router();
const regController = require('../controllers/registration');
const loginController = require('../controllers/login');
const tlController = require('../controllers/topLevel_passport');
const angularController = require('../controllers/angular');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const databaseAPI = require('../components/database');

passport.use(new LocalStrategy(function verify(username, password, cb) {
	tlController.validateLogin(username, password, cb);
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/register', regController.routeDisplay);

router.get('/login', loginController.routeDisplay);
router.get('/angular/login', angularController.login);

router.post('/login/password', passport.authenticate('local', {
		  successRedirect: '/',
		  failureRedirect: '/login',
		  failureMessage: true,
		}
	)
);

router.post('/angular/password', passport.authenticate('local', {
		  successRedirect: '/angular',
		  failureRedirect: '/angular/login',
		  failureMessage: true,
		}
	)
);
router.post('/register/user', tlController.register);

router.get('/', tlController.mainpage);
router.get('/angular', angularController.mainpage);

module.exports = router;
