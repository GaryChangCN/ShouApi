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
                reject(err);
            } else {
                var b = body.toLocaleLowerCase();
                var data = typeof b == "string" ? JSON.parse(b) : b;
                if(typeof data.data=="string" || data.code=="-1"){
                    resolve({
                        expire:true
                    });
                }else{
                    resolve(data);
                }
            }
        })
    });
}
var getUrp = function(cookie, url) {
    var iconv = require("iconv-lite");
    return new Promise(function(resolve, reject) {
        request.get({
            url: url,
            headers: {
                'Cookie': cookie
            }
        }, function(err, res, body) {}).pipe(iconv.decodeStream('gbk')).collect(function(err, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

module.exports = {
    get,
    getUrp
}