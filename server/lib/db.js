var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/shoumedia');
mongoose.Promise = global.Promise;

var userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    college: String,
    updateTime:Date,
    urpPassword:String
});

var currScema = new Schema({
    username: String,
    classData: {
        default: [],
        type: Array
    }
})
var addressSchema = new Schema({
    name: String,
    position: {
        type: String,
        default: "未知"
    },
    mobile: {
        type: String,
        default: "未知"
    },
    number: {
        type: String,
        default: "未知"
    },
    email: {
        type: String,
        default: "未知"
    }
})
var infoPlusSchema = new Schema({
    username: String,
    name: {
        type: String,
        default: "未知"
    },
    idCard: { type: String, default: "未知" },
    national: { type: String, default: "未知" },
    highSchoolExam: { type: String, default: "未知" },
    highSchoolName: { type: String, default: "未知" },
    address: { type: String, default: "未知" },
    parents: { type: String, default: "未知" },
    college: { type: String, default: "未知" },
    major: { type: String, default: "未知" },
    className: { type: String, default: "未知" },
    room: { type: String, default: "未知" }
})

var User = mongoose.model('User', userSchema);
var Curr = mongoose.model('Curriculum', currScema);
var Address = mongoose.model('Address', addressSchema);
var InfoPlus = mongoose.model('InfoPlus', infoPlusSchema);

module.exports = {
    User,
    Curr,
    Address,
    InfoPlus
};