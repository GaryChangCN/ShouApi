var { cry } = require("../../lib/util");

module.exports = async function(ctx, next) {
    if (ctx.method.toUpperCase() == "GET") {
        try {
            var { thirdSession } = ctx.query;
            var _id = cry().decode(thirdSession);
            var res = await ctx.db.Wxapp.findOne({ _id }, `username avatar`).exec();
            if (res) {
                var { avatar,username } = res;
                ctx.body = {
                    data:{
                        avatar:avatar||username,
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
            await next();
        }
    } else {
        await next();
    }
}