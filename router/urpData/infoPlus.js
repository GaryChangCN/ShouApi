var infoPlusCore=require('./lib/infoPlusCore');

module.exports=async function (ctx,next){
	var {username,urppassword,type}=ctx.request.body;
	await infoPlusCore(ctx,next,username,urppassword,type);
}