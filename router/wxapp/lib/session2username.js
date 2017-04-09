var {cry}=require("./config.wx");

module.exports=async function(ctx,thirdSession){
    var _id = cry().decode(thirdSession);
    var { username } = await ctx.db.Wxapp.findOne({ _id },'username').exec();
    return username;
}