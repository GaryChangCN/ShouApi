var s2u = require('../lib/session2userInfo');
module.exports = async function(ctx, next) {
    try {
        var { thirdSession } = ctx.query;
        var { username, urppassword } = await s2u(thirdSession);
        if (username) {
            return require("../../urpData/lib/curriCore")(ctx, next, username, urppassword);
        } else {
            ctx.body = {
                data:{
                    pass:false
                }
            }
        }
    } catch (error) {
        await next();
    }
}