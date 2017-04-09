var session2username=require("./lib/session2username");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession, type } = ctx.query;
        var username=await session2username(ctx,thirdSession);
        if (username) {
            return require("../getInfoPlus")(ctx, next, username, type);
        } else {
            ctx.body = {
                err: {
                    message: "没有绑定urp"
                }
            }
        }
    } catch (error) {
        await next();
    }
}