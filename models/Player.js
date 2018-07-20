var mongoose = require('mongoose');
/* mongoose schema to connect to mlab database */
var playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Required name',
    },
    salary:{
        type: String,
        required:'Required salary',

    },
    contractDuration:{
        type: String,
        required:'Required contract',

    },
    age:{
        type:Number,
    },
   
});


module.exports = mongoose.model('Player', playerSchema);