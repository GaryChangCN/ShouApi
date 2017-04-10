var newAchiCore=require('./lib/newAchiCore');

module.exports=async function (ctx,next){
	var {username,urppassword}=ctx.request.body;
	await newAchiCore(ctx,next,username,urppassword);
}