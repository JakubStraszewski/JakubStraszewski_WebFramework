var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var passport = require('passport');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./app_server/routes/index');
var restRouter = require('./app_server/routes/rest');

var databaseAPI = require('./app_server/components/database');
var concerts = require("./app_server/components/concerts");

var app = express();

databaseAPI.initializeDatabase();
const user = databaseAPI.createObject( {
	name: String,
	password: String,
}, "users", "user");

const concert = databaseAPI.createObject( {
	title: String,
	date: String,
	price: Number,
}, "concerts", "concert");

concerts.addConcert("Winter Polyphony Feast", "12th of December, 2023", 49.99);
concerts.addConcert("Christmas Musical Festival", "22th of December, 2023", 19.99);

app.use(session({
  secret: 'jsecret',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './app_server/sessions' })
}));
app.use(passport.authenticate('session'));


// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

app.use('/api', function(req, res, next) {
res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
});


app.use('/', indexRouter);
app.use('/api', restRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
