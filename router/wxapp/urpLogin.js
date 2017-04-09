var { cry } = require("./lib/config.wx");
module.exports = async function(ctx, next) {
    var { username, urppassword, thirdSession } = ctx.request.body;
    var _id = cry().decode(thirdSession);
    return require("../login/urpLogin")(ctx, next, username, urppassword, _id);
}