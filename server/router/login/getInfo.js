module.exports=function(username){
    var db=require('./../../lib/db');
    return db.User.findOne({username:username},'username password urpPassword').exec();
}