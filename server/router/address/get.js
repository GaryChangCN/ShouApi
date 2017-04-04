module.exports =async function(ctx,next) {
    if (ctx.method.toUpperCase() == "GET") {
        try {
            var {keywords} = ctx.params;
            var reg = new RegExp(keywords);
            var a = await ctx.db.Address.find({ $or: [{ name: reg }, { mobile: reg }] }).exec();
            ctx.body = {
                err: false,
                data: a
            }
        } catch (error) {
            ctx.logger.error(error);
            await next();
        }
    } else {
        await next();
    }
}