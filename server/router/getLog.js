var getCard=require('./../myModules/getCard');

module.exports=function*(next){
    try {
        var username=this.params.username;
        var start=this.params.start;
        var end=this.params.end;
        var getLog=yield this.db.User.findOne({
            username: username
        }).exec().then(function(value){
            return getCard.getLog(value.cookie,value.md5,start,end);
        }).then(function(value){
            return {
                err:false,
                data:value.data,
                state:value.state
            }
        })
        this.body = getLog;
    } catch (error) {
        yield next;
    }
}