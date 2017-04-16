var {cry}=require("./util");
var db=require('../../../lib/db');

module.exports=async function(thirdSession){
    var _id = cry().decode(thirdSession);
    var data = await db.Wxapp.findOne({ _id },'username').exec();
    if(data&&data.username){
        var {username}=data;
        var {urpPassword}= await db.User.findOne({username},'urpPassword').exec();
        return {
            username,
            urppassword:urpPassword,
            _id,
            bindUrp:true
        };
    }else{
        return {
            bindUrp:false
        }
    }
}