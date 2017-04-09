var {cry}=require("./lib/config.wx");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession, type ,data} = ctx.request.body;
        var _id = cry().decode(thirdSession);
        switch (type) {
            case "avatar":
                ctx.db.Wxapp.update({_id},{avatar:data}).exec();
                break;
            default:
                
        }
        ctx.body={
            data:{
                updated:true
            }
        }
    } catch (error) {
        await next();
    }
}