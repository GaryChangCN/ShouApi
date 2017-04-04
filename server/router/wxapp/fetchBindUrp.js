var {cry} = require("./lib/config.wx");

module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.query;
        var _id = cry().decode(thirdSession);
        var { username } = await ctx.db.Wxapp.findOne({ _id }).exec();
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