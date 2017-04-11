var { cry } = require("../lib/util");
var {appid,secret}=require('../../../wxappConfig');
var request = require("superagent");

module.exports = async function(ctx, next) {
    try {
        var { code } = ctx.request.body;
        var js_code = code;
        var grant_type = "authorization_code";
        var url = "https://api.weixin.qq.com/sns/jscode2session";
        var infoFromWx = await request.get(url).query({
            appid,
            secret,
            "js_code": js_code,
            "grant_type": grant_type
        });
        var { errcode, openid, session_key } = JSON.parse(infoFromWx.text);
        if (errcode) {
            ctx.body = {
                err: {
                    message: "微信登录验证失败"
                }
            }
        } else {
            var data = {
                openid,
                "session_key": session_key
            };
            var saved = await ctx.db.Wxapp.update({ openid },
                data, { upsert: true }
            ).exec();
            var { _id } = await ctx.db.Wxapp.findOne({ openid }, '_id').exec();
            var thirdSession = cry().encode(_id.toString());
            ctx.body = {
                data: {
                    thirdSession
                }
            }
        }
    } catch (error) {
        await next();
    }
}