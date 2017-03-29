var charset = require("superagent-charset");
var request = require("superagent");
charset(request);

module.exports =async function(ctx,next) {
    try {
        var username = ctx.request.body.username;
        var password = ctx.request.body.urppassword;
        var valid = await request.post("http://urp.shou.edu.cn/loginAction.do").charset('gbk').type('form').send({
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
            await ctx.db.User.update({ username: username }, { $set: a }, { upsert: true }).exec();
            ctx.body = {
                urpPass: true,
                err: false
            }
        } else {
            ctx.body = {
                urpPass: false,
                err: true
            }
        }
    } catch (err) {
        ctx.logger.error(err);
        await next();
    }
}