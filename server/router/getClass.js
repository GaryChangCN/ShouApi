var request=require("request");
module.exports=function*(next){
    try{
        var username=this.params.username;
        var info=yield this.db.User.findOne({username:username},'password username');
        var cookieArr=yield require("./../lib/getUrpCookie")(info);
        var cookie=cookieArr[0].split(";").shift();
        var url="http://urp.shou.edu.cn/xkAction.do?actionType=6";
        var res=yield require("../lib/get").getUrp(cookie,url); 
        require("fs").writeFile("./xx.html",res)
        this.body=res
    }catch(error){
        this.logger.error(error);
        yield next;
    }
}