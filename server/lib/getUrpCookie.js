var request = require("request");
module.exports = function(info) {
    return new Promise(function(resolve, reject) {
        var opt = {
            url: "http://urp.shou.edu.cn/loginAction.do",
            headers: {
                Origin: "http://urp.shou.edu.cn",
                Referer: "http://urp.shou.edu.cn/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"
            },
            form: {
                zjh: info.username,
                mm: info.password
            }
        }
        request.post(opt, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                resolve(res.headers['set-cookie']);
            }
        })
    })
}