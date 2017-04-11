var {cry}=require('../../lib/util');
module.exports = async function(ctx, next) {
    if (ctx.method.toUpperCase() == "GET") {
        try {
            var { thirdSession } = ctx.query;
			var _id = cry().decode(thirdSession);
			var data=await ctx.db.Wxapp.findOne({_id},'msg').exec();
			if(data){
				var {msg}=data;
				ctx.body={
					data:{
						ret:msg,
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