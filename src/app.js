var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var session  = require('express-session');
const {User} = require('./models/user');

var index = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

/**
* Passport
* Used to test if the token is valid 
**/
passport.use(
  new BearerStrategy(function(token, done) {
    User.findOne({
      where: {
        access_token: token
      }
    }).then(function(user) {

      if (!user) {
        return done(null, false);
      }

      return done(null, user, { scope: 'all' });
    });
  })
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error('error => ',err);
  res.status(400).send(err.message);
});

module.exports = app;
