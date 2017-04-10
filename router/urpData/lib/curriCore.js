var fetchUrpCurri = require('../../../lib/fetchUrpCurri');
var valid = require('./localValidUrpLogin');
var passFalse=require("./passFalse");

module.exports = async function(ctx, next, username, urppassword, type = "cache") {
    try {
        if (type == "fresh") {
			await fetchFresh(ctx,username,urppassword);
        } else {
            var { pass } = await valid(username, urppassword);
            if (pass) {
                var data = await ctx.db.Curr.findOne({ username }).exec();
                if (data) {
                    var { classData } = data;
                    ctx.body = {
                        data: {
                            classData,
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
        await next();
    }
}

async function fetchFresh(ctx, username, urppassword) {
    var { data } = await fetchUrpCurri(username, urppassword);
    var { ret, pass } = data;
    if (pass) {
        var classData = ret;
        ctx.db.Curr.update({ username }, { $set: { classData } }, { upsert: true }).exec();
        ctx.body = {
            data: {
                classData: ret,
                pass,
                type: "fresh"
            }
        }
    } else {
        passFalse(ctx);
    }
}
