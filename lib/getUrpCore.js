var charset = require("superagent-charset");
var request = require("superagent");
charset(request);

function core(url, info) {
    return request.post("http://urp.shou.edu.cn/loginAction.do").type('form').send({
        zjh: info.username,
        mm: info.password
    }).then(function(res) {
        if (res.text.indexOf("errorTop") >= 0) {
            return { msg: "账号密码错误", pass: false };
        } else {
            var cookie = res.headers['set-cookie'][0].split(" ")[0];
            return request.get(url).set({
                "Cookie": cookie,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Cache-Control": "no-cache"
            }).charset('gbk');
        }
    }).then(function(res) {
        return res.text.toString();
    });
}

module.exports = core;