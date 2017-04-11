var {cry}=require('../lib/util');

module.exports = async function(ctx, next) {
    try {
        var { thirdSession,avatar} = ctx.request.body;
        var _id = cry().decode(thirdSession);
        ctx.db.Wxapp.update({_id},{avatar}).exec();
        ctx.body={
            data:{
                avatar:true
            }
        }
    } catch (error) {
        await next();
    }
}