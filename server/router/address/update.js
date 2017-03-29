module.exports =async function(ctx,next) {
    if (ctx.method.toUpperCase() == "PUT") {
        try {
            var _id=ctx.request.body._id;
            var change=ctx.request.body.change;
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