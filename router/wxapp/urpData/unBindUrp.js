var { cry } = require('../lib/util');

module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.request.body;
        var _id = cry().decode(thirdSession);
        var {username}=await ctx.db.Wxapp.findOne({_id}).exec();
        ctx.db.UserMsg.remove({username}).exec();//删除消息记录
        await ctx.db.Wxapp.update({ _id }, { $set: { username: "", avatar: "" } }).exec();
        ctx.body = {
            data: {
                pass: false
            }
        }
    } catch (error) {
        await next();
    }
}