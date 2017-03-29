module.exports =async function(ctx,next) {
    try {
        var request = require("request");
        var username = ctx.request.body.username;
        var password = ctx.request.body.password;
        var a = await new Promise(function(resolve, reject) {
            request.post({
                url: 'http://202.121.64.37/User/login',
                form: {
                    username: username,
                    password: password
                }
            }, function(err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    var d = JSON.parse(body.toLowerCase());
                    var data = d.data
                    if (d.code == 0) {
                        var tmp = {
                            cookie: res.headers['set-cookie'][0],
                            username,
                            md5: data.md5code,
                            name: data.psnname,
                            college: data.psndept,
                        }
                        resolve(tmp)
                    } else {
                        resolve(false)
                    }
                }
            });
        });
        if(!!a){
            a.password=password;
            a.updateTime=new Date();
            await ctx.db.User.update({username:username},{$set:a},{upsert:true}).exec();
            ctx.body={
                err:false
            }
        }else{
            ctx.body={
                err:"用户名或者密码错误"
            }
        }
    } catch (err) {
        ctx.logger.error(err);
        await next();
    }
}