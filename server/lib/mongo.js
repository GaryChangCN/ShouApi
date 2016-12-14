var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/shoumedia');
mongoose.Promise = global.Promise;

var userSchema = new Schema({
    username: String,
    password: String,
    md5: String,
    name: String,
    college: String,
    cookie: String
});

var User = mongoose.model('User', userSchema);



module.exports = {
    User: User
};