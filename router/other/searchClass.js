module.exports=async function (ctx,next){
	try {
		var {keywords}=ctx.request.body;
		if(!keywords){
			await next();
		}else{
			var reg=new RegExp(keywords);
			var list=await ctx.db.Subject.find({
				$or:[{
					kch:reg
				},{
					kcm:reg
				},{
					js:reg
				}]
			}).exec();
			ctx.body={
				data:{
					list
				}
			}
		}
	} catch (error) {
		await next();
	}
}