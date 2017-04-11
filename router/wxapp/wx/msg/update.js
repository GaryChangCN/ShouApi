var {cry}=require('../../lib/util');
module.exports = async function(ctx, next) {
    if (ctx.method.toUpperCase() == "PUT") {
        try {
            var { thirdSession } = ctx.query;
			var {msgId}=ctx.request.body;
			var _id = cry().decode(thirdSession);
			var data=await ctx.db.Wxapp.findOne({_id},'msg').exec();
			if(data){
				var {msg}=data;
				msg=msg.map((item)=>{
					if(item.msgId==msgId){
						item.read=true;
					}
					return item;
				});
				ctx.db.Wxapp.update({_id},{$set:msg}).exec();
				ctx.body={
					data:{
						update:true,
						pass:true
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