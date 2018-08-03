var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser =require('body-parser');
/* passport dependencies */
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* requiring mongoose and dotenv */
require('dotenv').config({path:'variables.env'});

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// takes request and chnage them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* passport config before controller references that works as middleware*/
app.use(
  session({
    secret: 'any string value here',
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const user = require('./models/User');
passport.use(user.createStrategy());
passport.use(
  new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (request, accessToken, refreshToken, profile, done) => {
    user.findOrCreate(
      { username: profile.emails[0].value },
      (err, user) => done(err, user)
    );
  }
)
);
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
