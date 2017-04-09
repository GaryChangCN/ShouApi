var {cry}=require("./lib/config.wx");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession, type } = ctx.query;
        var _id = cry().decode(thirdSession);
        var res = await ctx.db.Wxapp.findOne({ _id },`username ${type}`).exec();
        var { username }=res;
        if (username) {
            ctx.body={
                data:res
            }
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