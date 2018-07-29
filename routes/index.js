var express = require('express');
var router = express.Router();
var playersController = require('../controllers/playersController');
var userController = require('../controllers/userController');

/* routes for diferent pages at web app */
router.get('/', playersController.home);
router.get('/players', playersController.getPlayers);
router.get('/add', playersController.addPlayer );
router.post('/add', playersController.createPlayer);
router.get('/players/delete/:id', playersController.deletePlayer);
router.get('/players/edit/:id', playersController.editPlayer);
router.post('/players/edit/:id', playersController.updatePlayer);

router.get('/register', userController.register);
router.get('/login', userController.login);

module.exports = router;

