var {cry}=require('../../lib/util');
module.exports = async function(ctx, next) {
    if (ctx.method.toUpperCase() == "DELETE") {
        try {
            var { thirdSession,msgId } = ctx.query;
			var _id = cry().decode(thirdSession);
			var {username}=await ctx.db.Wxapp.findOne({_id},'username').exec();
			if(username){
				var {msgList}=await ctx.db.UserMsg.findOne({username}).exec();
				msgList.map((item)=>{
					if(item.msgId==msgId){
						item.delete=true;
					}
					return item;
				});
				ctx.db.UserMsg.update({username},{msgList}).exec();
				ctx.body={
					data:{
						pass:true,
						modify:true
					}
				}
			}else{
				ctx.body={
					data:{
						pass:false
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