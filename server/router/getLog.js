var getCard = require('./../myModules/getCard');

module.exports = function*(next) {
    try {
        var _this=this;
        var username = this.params.username;
        var start = this.params.start;
        var end = this.params.end;
        var info = {};
        var fun = function(username) {
            return  _this.db.User.findOne({
                username: username
            }).exec().then(function(value) {
                info = value;
                return getCard.getLog(value.cookie, value.md5, start, end);
            }).then(function(value) {
                return {
                    err: false,
                    data: value.data||[]
                }
            })
        };
        var getLog = yield fun(username);
        if (typeof getLog.data !== "string") {
            console.log(info);
            getLog =yield require('../myModules/refreshLogin')(info, this).then(function() {
                return fun(username);
            });
        }
        this.body = getLog;
    } catch (error) {
        yield next;
    }
}