var {cry}=require('../../lib/util');
module.exports = async function(ctx, next) {
    if (ctx.method.toUpperCase() == "GET") {
        try {
            var { thirdSession , type} = ctx.query;
			var _id = cry().decode(thirdSession);
			var {username}=await ctx.db.Wxapp.findOne({_id},'username').exec();
			if(username){
				var {msgList}=await ctx.db.UserMsg.findOne({username}).exec();
				if(msgList){
					var tmp=[];
					msgList.forEach((item)=>{
						if(!item.delete){
							tmp.push(item);
						}
					});
					msgList=tmp;
				}else{
					msgList=[];
				}
				if(type=="unread"){
					var count=0;
					msgList.forEach((item)=>{
						if(!item.read){
							count++;
						}
					});
					ctx.body={
						data:{
							pass:true,
							count
						}
					}
				}else{
					ctx.body={
						data:{
							pass:true,
							msgList
						}
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
			console.log(error);
            await next();
        }
    } else {
        await next();
    }
}