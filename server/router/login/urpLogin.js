var charset = require("superagent-charset");
var request = require("superagent");
charset(request);

module.exports = function*(next) {
    try {
        var username = this.request.body.username;
        var password = this.request.body.urppassword;
        var valid = yield request.post("http://urp.shou.edu.cn/loginAction.do").charset('gbk').type('form').send({
            zjh: username,
            mm: password
        }).then(function(res) {
            if (res.text.indexOf("errorTop") >= 0) {
                return { msg: "账号密码错误", pass: false };
            } else {
                return { pass: true };
            }
        });
        if (valid.pass) {
            var a = {};
            a.username = username;
            a.urpPassword = password;
            a.updateTime = new Date();
            yield this.db.User.update({ username: username }, { $set: a }, { upsert: true }).exec();
            this.body = {
                urpPass: true,
                err: false
            }
        } else {
            this.body = {
                urpPass: false,
                err: true
            }
        }
    } catch (err) {
        this.logger.error(err);
        yield next;
    }
}