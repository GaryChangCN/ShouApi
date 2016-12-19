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

var currScema=new Schema({
    username:String,
    classData:{
        default:[],
        type:Array
    }
})
var addressSchema=new Schema({
    name:String,
    position:{
        type:String,
        default:"未知"
    },
    mobile:{
        type:String,
        default:"未知"
    },
    number:{
        type:String,
        default:"未知"
    },
    email:{
        type:String,
        default:"未知"
    }
})

var User = mongoose.model('User', userSchema);
var Curr = mongoose.model('Curriculum', currScema);
var Address=mongoose.model('Address',addressSchema);

module.exports = {
    User,
    Curr,
    Address
};