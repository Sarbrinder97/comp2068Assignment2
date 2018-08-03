const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const findOrCreate = require('mongoose-findorcreate');

/* create the model schema in which username and password are included automatically */

const userSchema = new mongoose.Schema({});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);

