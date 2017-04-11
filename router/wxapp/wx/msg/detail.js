module.exports = async function(ctx, next) {
    try {
        var { msgId } = ctx.query;
        var data = await ctx.Msg.findOne({ _id, msgId }).exec();
        if (data) {
            var { title, content } = data;
            ctx.body = {
                data: {
                    title,
                    content
                }
            }
        } else {
            ctx.body = {
                data: {
                    title: "提示",
                    content: "本条消息没有详细通知"
                }
            }
        }
    } catch (error) {
        await next();
    }
}