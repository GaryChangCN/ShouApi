module.exports=async function (ctx,next){
	try {
		var {kch,kcm,js}=ctx.query;
		var qk;
		if(kch){
			qk={kch}
		}else if(kcm){
			if(kcm.length>=4){
				qk={kcm:new RegExp(kcm)}
			}else{
				qk={kcm}
			}
		}else if(js){
			qk={js}
		}else{
			await next();
		}
		var list=await ctx.db.Subject.find(qk).exec();
		ctx.body={
			data:{
				list
			}
		}
	} catch (error) {
		await next();
	}
}