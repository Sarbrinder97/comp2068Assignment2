var express = require('express');
var router = express.Router();
var playersController = require('../controllers/playersController');

/* routes for diferent pages at web app */
router.get('/', playersController.home);
router.get('/players', playersController.getPlayers);


module.exports = router;

