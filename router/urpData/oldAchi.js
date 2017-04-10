var oldAchiCore=require('./lib/oldAchiCore');

module.exports=async function (ctx,next){
	var {username,urppassword,type}=ctx.request.body;
	await oldAchiCore(ctx,next,username,urppassword,type);
}