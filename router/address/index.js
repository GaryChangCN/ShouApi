module.exports =async function(ctx,next) {
    try {
        var {keywords} = ctx.request.body;
        var reg = new RegExp(keywords);
        var data = await ctx.db.Address.find({ $or: [{ name: reg }, { mobile: reg }] }).exec();
        ctx.body = {
            err: false,
            data
        }
    } catch (error) {
        ctx.logger.error(error);
        await next();
    }
}