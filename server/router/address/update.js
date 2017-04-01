module.exports =async function(ctx,next) {
    if (ctx.method.toUpperCase() == "PUT") {
        try {
            var {_id,change}=ctx.request.body;
            await ctx.db.Address.update({_id:_id},{$set:change}).exec();
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