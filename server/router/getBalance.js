var getCard=require('../myModules/getCard');

module.exports=function*(next){
    try {
        var username = this.params.username;
        var getCardInfo = yield this.db.User.findOne({
            username: username
        }).exec().then(function(value){
            return  getCard.getBalance(value.cookie, value.md5);
        }).then(function(value){
            return {
                err:false,
                data:value.data,
                state:value.state
            }
        })
        this.body = getCardInfo;
    } catch (error) {
        yield next;
    }
}