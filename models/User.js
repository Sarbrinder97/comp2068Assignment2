const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/* create the model schema in which username and password are included automatically */

const userSchema = new mongoose.Schema({});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

