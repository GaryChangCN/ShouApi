var fetchUrpOldAchi = require('../../../lib/fetchUrpOldAchi');
var valid = require('./localValidUrpLogin');
var passFalse=require("./passFalse");

module.exports = async function(ctx, next, username, urppassword, type = "cache") {
    try {
        if (type == "fresh") {
			await fetchFresh(ctx,username,urppassword);
        } else {
            var { pass } = await valid(username, urppassword);
            if (pass) {
                var data = await ctx.db.OldAchi.findOne({ username }).exec();
                if (data) {
                    var { achi } = data;
                    ctx.body = {
                        data: {
                            ret:achi,
                            pass,
                            type: "cache"
                        }
                    }
                } else {
                    await fetchFresh(ctx,username,urppassword);
                }
            } else {
                passFalse(ctx);
            }
        }
    } catch (error) {
		console.log(error);
        await next();
    }
}

async function fetchFresh(ctx, username, urppassword) {
    var { data } = await fetchUrpOldAchi(username, urppassword);
    var { ret, pass } = data;
    if (pass) {
        ctx.db.OldAchi.update({ username }, { $set: { achi:ret } }, { upsert: true }).exec();
        ctx.body = {
            data: {
                ret,
                pass,
                type: "fresh"
            }
        }
    } else {
        passFalse(ctx);
    }
}
