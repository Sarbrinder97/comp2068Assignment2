var express = require('express');
var router = express.Router();
var playersController = require('../controllers/playersController');

/* GET home page. */
router.get('/', playersController.home);
router.get('/players', playersController.getPlayers);


module.exports = router;

