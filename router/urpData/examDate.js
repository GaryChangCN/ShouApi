var examDateCore=require('./lib/examDateCore');

module.exports=async function (ctx,next){
	var {username,urppassword}=ctx.request.body;
	await examDateCore(ctx,next,username,urppassword);
}