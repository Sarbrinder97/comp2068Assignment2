var Player = require('../models/Player');
/* exporting model schema to the controller  */
exports.getPlayers = (req, res)=>{
    Player.find((err, players)=>{
        if (err){
            res.render('error');
        } else{res.render('players',{
            title:'NBA Management App',
            heading:'All players',
            players,
            user: req.user,
          });

        }
    });
    
};
/* this method will add players to mlab */
exports.addPlayer = (req, res) => {
    res.render('addPlayer',{
      title:'NBA Management App',
        heading:'Add Player',
        user:req.user
    })
}

exports.createPlayer = (req, res) => {
    try {
      const player = new Player(req.body);
      player.save();
      res.redirect('/players');
    } catch (err) {
      console.log(err);
    }
  };
  exports.deletePlayer = (req, res) => {
    // use the Player model's remove method to delete the document with the id passed
    Player.remove({ _id: req.params.id }, err => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/players');
      }
    });
  }

  exports.editPlayer = (req, res, next) => {
    // use Game model to find the selected document
    Player.findById({ _id: req.params.id }, (err, player) => {
      if (err) {
        console.log(err);
      } else {
        res.render('editplayer', {
          title:'NBA Management App',
        heading:'Edit',
          player,
          user:req.user
        });
      }
    });
  };

  exports.updatePlayer = (req, res) => {
    
    
  
    Player.update({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/players');
      }
    });
  };
exports.home = (req, res, next)=>{
    res.render('index',{title:'NBA Management App', user:req.user})
};