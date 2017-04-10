var fetchUrpInfoPlus=require('../../../lib/fetchUrpInfoPlus');
var fetchUrpAvatar=require('../../../lib/fetchUrpAvatar');
var valid=require('./localValidUrpLogin');
var passFalse=require('./passFalse');

module.exports=async function (ctx,next,username,urppassword,type="cache"){
	try {
		if (type == "fresh") {
			await fetchFresh(ctx,username,urppassword);
        } else {
            var { pass } = await valid(username, urppassword);
            if (pass) {
                var ret = await ctx.db.InfoPlus.findOne({ username }).exec();
                if (ret) {
                    ctx.body = {
                        data: {
                            ret,
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

async function fetchFresh(ctx,username,urppassword){
	var { data } = await fetchUrpInfoPlus(username, urppassword);
    var { ret, pass } = data;
    if (pass) {
        ctx.db.InfoPlus.update({ username }, ret, { upsert: true }).exec();
        fetchUrpAvatar(username,urppassword);
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