var { cry } = require('./lib/util');

module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.request.body;
        var _id = cry().decode(thirdSession);
        await ctx.db.Wxapp.update({ _id }, { $set: { username: "" } }).exec();
        ctx.body = {
            data: {
                pass: false
            }
        }
    } catch (error) {
        await next();
    }
}