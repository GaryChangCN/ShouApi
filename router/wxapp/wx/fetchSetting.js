var {cry}=require("../lib/util");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession, setting } = ctx.query;
        var _id = cry().decode(thirdSession);
        var res = await ctx.db.Wxapp.findOne({ _id },`username ${type}`).exec();
        var { username }=res;
        if (username) {
            ctx.body={
                data:res,
                pass:true
            }
        } else {
            ctx.body = {
                data:{
                    pass:false
                }
            }
        }
    } catch (error) {
        await next();
    }
}