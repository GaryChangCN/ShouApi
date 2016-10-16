var request = require("request");
var form = new require('formidable').IncomingForm();

var info = function(_this) {
    var login = new Promise(function(reslove, reject) {
        form.parse(_this.req, function(err, field, files) {
            request.post({
                url: 'http://202.121.64.37/User/login',
                form: {
                    username: field.username,
                    password: field.password
                }
            }, function(err, res, body) {
                if (!err) {
                    var cookie = res.headers['set-cookie'];
                    body = JSON.parse(body);
                    if (body.Code != 0) {
                        reject({
                            err: true
                        });
                    } else {
                        reslove({
                            md5: body.Data.MD5Code,
                            name: body.Data.PsnName,
                            college: body.Data.PsnDept,
                            cookie: cookie[0]
                        });
                    }
                } else {
                    reject({
                        err: true
                    });
                }
            });
        });
    });
    return login;
}

exports.info = info;