var s2u=require('../../lib/session2userInfo');

module.exports=async function (ctx,next){
	if(ctx.method.toUpperCase()=="GET"){
		var {thirdSession}=ctx.query;
		var {username,urppassword}=s2u(thirdSession)
	}else{
		await next();
	}
}