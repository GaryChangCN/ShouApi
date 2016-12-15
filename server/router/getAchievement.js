delete require.cache[require.resolve('../lib/getAchievement')];
var getAchievement = require('../lib/getAchievement')

module.exports = function*(next) {
    try {
        var username = this.params.username;
        var info={};
        var fun = function(username) {
            return this.db.User.findOne({
                    username: username
                }).exec().then(function(value) {
                    info=value;
                    return getAchievement.getAchievement(value.cookie, value.md5);
                })
                .then(function(value) {
                    if (value) {
                        return {
                            err: false,
                            data: value.data||[]
                        }
                    } else {
                        return {
                            data:[],
                            err: "暂时没有出成绩"
                        }
                    }
                })
        }.bind(this);
        var a = yield fun(username);
        if(!!a.err||typeof a.data=="string"){
            a=yield require('../lib/refreshLogin')(info,this).then(function(){
                return fun(username);
            });
        }
        this.body = a;
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}