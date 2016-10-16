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
                var body=body.toLocaleLowerCase();
                var body = JSON.parse(body);
                if (body.Code == '-1') {
                    reject({
                        state: false
                    });
                } else {
                    resolve({
                        data: body.data,
                        state: true
                    });
                }
            }
        });
    })
}

exports.get = get;