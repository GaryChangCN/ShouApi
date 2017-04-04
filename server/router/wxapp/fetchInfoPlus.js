var { cry } = require("./lib/config.wx");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession, type } = ctx.query;
        var _id = cry().decode(thirdSession);
        var { username } = await ctx.db.Wxapp.findOne({ _id }).exec();
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