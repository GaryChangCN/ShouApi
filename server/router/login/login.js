module.exports = function*(next) {
    try {
        var _this = this;
        var request = require("request");
        var username = this.request.body.username;
        var password = this.request.body.password;
        var a = yield new Promise(function(resolve, reject) {
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
            yield this.db.User.update({username:username},{$set:a},{upsert:true}).exec();
            this.body={
                err:false,
                data:a
            }
        }else{
            this.body={
                err:"用户名或者密码错误"
            }
        }
    } catch (err) {
        this.logger.error(err);
        yield next;
    }
}