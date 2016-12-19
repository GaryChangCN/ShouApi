var request = require('request');

var get = function(cookie, url) {
    return new Promise(function(resolve, reject) {
        request.get({
            url: url,
            headers: {
                'Cookie': cookie
            }
        }, function(err, res, body) {
            if(err){
                reject(err);
            }else{
                var b=body.toLocaleLowerCase();
                console.log(b);
                resolve({
                    data:body.data
                });
            }
        })
    });
    // return new Promise(function(resolve, reject) {
    //     request.get({
    //         url: url,
    //         headers: {
    //             'Cookie': cookie
    //         }
    //     },{encoding:"binary"}, function(err, res, body) {
    //         if (err) {
    //             reject({
    //                 err: err
    //             });
    //         } else {
    //             var body=body.toLocaleLowerCase();
    //             var body = JSON.parse(body);
    //             if (body.Code == '-1') {
    //                 reject({
    //                     state: false
    //                 });
    //             } else {
    //                 resolve({
    //                     data: body.data,
    //                     state: true
    //                 });
    //             }
    //         }
    //     });
    // })
}
var getUrp = function(cookie, url) {
    var iconv=require("iconv-lite");
    return new Promise(function(resolve, reject) {
        request.get({
            url: url,
            headers: {
                'Cookie': cookie
            }
        }, function(err, res, body) {
        }).pipe(iconv.decodeStream('gbk')).collect(function(err,body){
            if(err){
                reject(err);
            }else{
                resolve(body);
            }
        })
    });
}

module.exports={
    get,
    getUrp
}