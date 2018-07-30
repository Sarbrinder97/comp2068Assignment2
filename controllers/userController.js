let passport = require('passport');
let Account = require('../models/User');

exports.register = (req, res) => {
  res.render('register', { 
    title:'NBA Management App',
    heading: 'Register',
    warning: '',
    user:req.user
   });
};

exports.registerUser = (req, res, next) => {
  const user = new Account({ username: req.body.username });
  Account.register(user, req.body.password, function(err, account) {
    if (err) {
      return res.render('register', {
        title:'NBA Management App',
         heading: 'Register',
        warning: 'Sorry, that username is already taken.  Try again.',
        user: req.user,
      });    }
    res.redirect('/login'); /* success */
  });
};


  
  exports.login = (req, res) => {
    const messages = req.session.messages || [];
    req.session.messages = [];
    res.render('login', { 
      title:'NBA Management App',
      heading: 'Login',
      messages: messages,
      user:req.user

     });
  };