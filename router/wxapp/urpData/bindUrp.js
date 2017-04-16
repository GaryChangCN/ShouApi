var { cry } = require('../lib/util');
var validUrpLogin = require('../../../lib/core/validUrpLogin');

module.exports = async function(ctx, next) {
    try {
        var { username, urppassword, thirdSession } = ctx.request.body;
        var _id = cry().decode(thirdSession);
        var { data } = await validUrpLogin(username, urppassword);
        if (data.pass) {
            await ctx.db.Wxapp.update({ _id }, { username }, { upsert: true }).exec();
            var a = {
                username,
                urpPassword: urppassword,
                updateTime: new Date()
            };
            var msgList = [
                { msgId: "", title: "欢迎使用海大新媒体微信小程序,目前你已经绑定urp信息，可以使用全部功能了", read: false, delete: false, detail: false }
            ]
            ctx.db.UserMsg.update({ username }, {msgList}, { upsert: true }).exec();
            await ctx.db.User.update({ username }, { $set: a }, { upsert: true }).exec();
            ctx.body = {
                data: {
                    pass: true
                }
            }
        } else {
            ctx.body = {
                data: {
                    pass: false
                }
            }
        }
    } catch (error) {
        console.error(error);
        await next();
    }
}