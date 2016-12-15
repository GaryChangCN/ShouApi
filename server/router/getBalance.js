var getCard = require('../lib/getCard');

module.exports = function*(next) {
    try {
        var _this = this;
        var info = {};
        var username = this.params.username;
        var getc=function(username) {
            return _this.db.User.findOne({
                username: username
            }).exec().then(function(value) {
                info = value;
                return getCard.getBalance(value.cookie, value.md5);
            }).then(function(value) {
                return {
                    err: false,
                    data: value.data||{}
                }
            })
        }
        var getCardInfo = yield getc(username);
        if(typeof getCardInfo.data=="string"){
            getCardInfo =yield require('../lib/refreshLogin')(info,this).then(function(){
                return getc(username);
            });
        }
        this.body = getCardInfo;
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}