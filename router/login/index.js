var validUrpLogin = require("../../lib/core/validUrpLogin");

async function login(ctx, next) {
    try {
        var { username, urppassword } = ctx.request.body;
		var { data } = await validUrpLogin(username, urppassword);
		if (data.pass) {
			var a = {
				username,
				urpPassword:urppassword,
				updateTime:new Date()
			};
			ctx.db.User.update({ username }, { $set: a }, { upsert: true }).exec();
			ctx.body = {
				data: {
					pass: true,
					username
				}
			}
		} else {
			ctx.body = {
				data: {
					pass: false
				}
			}
		}
    } catch (error) {
        console.log(error);
        await next();
    }
}

module.exports=login;