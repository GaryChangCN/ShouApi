var curriCore=require('./lib/curriCore');

module.exports=async function (ctx,next){
	var {username,urppassword,type}=ctx.request.body;
	await curriCore(ctx,next,username,urppassword,type);
}