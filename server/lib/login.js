var request = require("request");

module.exports = function(data) {
    return new Promise(function(reslove, reject) {
        request.post({
            url: 'http://202.121.64.37/User/login',
            form: {
                username: data.username,
                password: data.password
            }
        }, function(err, res, b) {
            if (!err) {
                var cookie = res.headers['set-cookie'];
                b = JSON.parse(b);
                if (b.Code != 0) {
                    reject({
                        err: true
                    });
                } else {
                    reslove({
                        username: data.username,
                        password: data.password,
                        md5: b.Data.MD5Code,
                        name: b.Data.PsnName,
                        college: b.Data.PsnDept,
                        cookie: cookie[0]
                    });
                }
            } else {
                reject({
                    err: true
                });
            }
        });
    })
}