module.exports =async function(ctx,next) {
    if (ctx.method.toUpperCase() == "POST") {
        try {
            var data=ctx.request.body;
            var name=data.name;
            var email=data.email;
            var number=data.number;
            var mobile=data.mobile;
            var position=data.position;
            var a=new ctx.db.Address({
                name,
                email,
                number,
                mobile,
                position
            });
            await a.save();
            ctx.body={
                err:false
            }
        } catch (error) {
            ctx.logger.error(error);
            await next();
        }
    } else {
        await next();
    }
}