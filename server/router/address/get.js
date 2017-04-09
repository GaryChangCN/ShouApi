module.exports =async function(ctx,next) {
    try {
        var {keywords} = ctx.request.body;
        var reg = new RegExp(keywords);
        var a = await ctx.db.Address.find({ $or: [{ name: reg }, { mobile: reg }] }).exec();
        console.log(a);
        ctx.body = {
            err: false,
            data: a
        }
    } catch (error) {
        ctx.logger.error(error);
        await next();
    }
}