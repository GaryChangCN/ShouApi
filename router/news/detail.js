var fetchNewsDetail=require("../../lib/fetchMainNewsDetail");

module.exports=async function (ctx,next){
	try {
		var {url}=ctx.query;
		var {data}=await fetchNewsDetail(url);
		var {ret}=data;
		ctx.body={
			data:ret
		}
	} catch (error) {
		await next();
	}
}