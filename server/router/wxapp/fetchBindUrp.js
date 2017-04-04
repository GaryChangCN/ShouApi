var session2username=require("./lib/session2username");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.query;
        var username=await session2username(ctx,thirdSession);
        if (username) {
            ctx.body={
                data:{
                    bindUrp:true,
                    username
                }
            }
        }else{
            ctx.body={
                data:{
                    bindUrp:false
                }
            }
        }
    } catch (error) {
        console.log(error);
        await next();
    }
}