var session2userInfo=require("../lib/session2userInfo");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.query;
        console.log(thirdSession);
        var {bindUrp}=await session2userInfo(thirdSession);
        ctx.body={
            data:{
                bindUrp
            }
        }
    } catch (error) {
        console.log(error);
        await next();
    }
}