module.exports=async function (ctx,next) {
    try {
        var {email,content,username}=ctx.request.body;
        var a=new  ctx.db.Feedback({
            email,
            content,
            username:username||"无"
        });
        a.save();
        ctx.body={
            data:{
                feedback:true
            }
        }
    } catch (error) {
        await next();
    }
}