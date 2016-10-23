var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    md5: String,
    name: String,
    college: String,
    cookie: String
});

var User = mongoose.model('userSchema', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/shoumedia');
var db = mongoose.connection;

db.on('error', function () {
    // console.log('error')
})

db.once('open', function () {
    // console.log('opened');
});

module.exports = {
    User: User
};