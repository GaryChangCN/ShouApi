module.exports=function*(next){
    try {
        var _this=this;
        var data={
            username:this.request.body.username,
            password:this.request.body.password
        }
        var a=yield require('./../myModules/login')(data).then(function(value){
            return  _this.db.User.count({username:value.username}).exec().then(function(sum){
                if(sum==0){
                    var s=new _this.db.User(value);
                    return s.save();
                }else{
                    return _this.db.User.update({username:value.username},value).exec();
                }
            })
        }).then(function(){
            return _this.db.User.findOne({username:data.username}).exec()
        })
        this.body = {
            err:true,
            data:a
        };
    } catch (error) {
        yield next;
    }
}