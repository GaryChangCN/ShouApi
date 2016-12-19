module.exports=function*(next){
    try {
        var _this=this;
        var data={
            username:this.request.body.username,
            password:this.request.body.password
        }
        var a=yield require('./../lib/login')(data).then(function(value){
            return  _this.db.User.count({username:value.username}).exec().then(function(sum){
                return _this.db.User.update({username:value.username},{$set:value},{upsert:true}).exec();
            })
        }).then(function(){
            return _this.db.User.findOne({username:data.username}).exec();
        })
        this.body = {
            err:true,
            data:a
        };
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}