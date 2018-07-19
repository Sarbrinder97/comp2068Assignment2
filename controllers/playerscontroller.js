var Player = require('../models/Player');

exports.getPlayers = (req, res)=>{
    Player.find((err, players)=>{
        if (err){
            res.render('error');
        } else{res.render('players',{
            title:'NBA Management App',
            heading:'All players',
            players});

        }
    });
    
};

exports.home = (req, res, next)=>{
    res.render('index',{title:'NBA Management App'})
};