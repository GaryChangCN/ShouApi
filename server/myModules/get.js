var request = require('request');


var get = function(cookie, url) {
    return new Promise(function(resolve, reject) {
        request.get({
            url: url,
            headers: {
                'Cookie': cookie
            }
        }, function(err, res, body) {
            if (err) {
                reject({
                    err: true
                });
            } else {
                var body = JSON.parse(body);
                resolve({
                    balance: body.data.balance,
                    state: body.msg == "成功" ? true : false
                })
            }
        });
    })
}

exports.get = get;