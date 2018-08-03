const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
  successRedirect: '/players',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
});



exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};
exports.googlePre = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
});
exports.googlePost = passport.authenticate('google', {
  successRedirect: '/players',
  failureRedirect: '/login'
});