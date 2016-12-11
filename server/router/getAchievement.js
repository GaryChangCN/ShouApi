delete require.cache[require.resolve('../myModules/getAchievement')];
var getAchievement=require('../myModules/getAchievement')

module.exports=function*(next){
    try {
        var username=this.params.username;
        var a=yield this.db.User.findOne({
            username: username
        }).exec().then(function(value){
            return getAchievement.getAchievement(value.cookie,value.md5);
        })
        .then(function(value){
            if(value){
                return {
                    err:false,
                    data:value.data,
                    state:value.state
                }
            }else{
                return {
                    err:"暂时没有出成绩",
                    state:true
                }
            }
        })
        this.body = a;
    } catch (error) {
        console.log(error);
        yield next;
    }
}