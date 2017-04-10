var fetchNewsList=require("../../lib/fetchMainNewsList");

module.exports=async function (ctx,next){
	try {
		var {pn,type}=ctx.query;
		var {data}=await fetchNewsList(pn,type);
		var {ret}=data;
		ctx.body={
			data:{
				list:ret
			}
		}
	} catch (error) {
		await next();
	}
}