var fetchUrpNewAchi = require('../../../lib/fetchUrpNewAchi');
var valid = require('./localValidUrpLogin');
var passFalse = require("./passFalse");

module.exports = async function(ctx, next, username, urppassword) {
    try {
        var { data } = await fetchUrpNewAchi(username, urppassword);
        var { ret, pass } = data;
        if (pass) {
            ctx.body = {
                data: {
                    ret,
                    pass
                }
            }
        } else {
            passFalse(ctx);
        }
    } catch (error) {
        await next();
    }
}