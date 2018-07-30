var express = require('express');
var router = express.Router();
var playersController = require('../controllers/playersController');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

/* routes for diferent pages at web app */
router.get('/', playersController.home);
router.get('/players', playersController.getPlayers);
router.get('/add', authController.isLoggedIn, playersController.addPlayer );
router.post('/add', playersController.createPlayer);
router.get('/players/delete/:id', playersController.deletePlayer);
router.get('/players/edit/:id', playersController.editPlayer);
router.post('/players/edit/:id', playersController.updatePlayer);

router.get('/register', userController.register);
router.post('/register', userController.registerUser);
router.get('/login', userController.login);
router.post('/login', authController.login);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/players');
  });
module.exports = router;

