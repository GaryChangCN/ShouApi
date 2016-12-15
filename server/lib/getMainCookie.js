var phantom = require("phantom");

module.exports = function(info) {
    var _ph, _page, _outObj;
    return phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']).then(function(ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function(page) {
        _page = page;
        return _page.setting('javascriptEnabled', 'true');
    }).then(function() {
        return _page.property('onConsoleMessage', function(msg) {
            console.log(msg);
        });
    }).then(function() {
        return _page.open("http://urp.shou.edu.cn/");
    }).then(function() {
        var p = _page.evaluate(function() {
            document.querySelector("input[name=zjh]").value = info.username;
            document.querySelector("input[name=mm]").value = info.password;
            document.getElementById("btnSure").click();
        });
        return p;
    }).then(function() {
        return new Promise(function(reslove, reject) {
            setTimeout(function() {
                reslove(true)
            }, 2000);
        })
    }).then(function() {
        return _page.evaluate(function() {
            return document.title;
        })
    }).then(function(title) {
        if (title == "学分制综合教务") {
            return "ready";
        } else {
            return new Promise(function(reslove, reject) {
                setTimeout(function() {
                    reslove(true)
                }, 2000);
            });
        }
    }).then(function(ready) {
        if (ready == "ready") {
            return "学分制综合教务";
        } else {
            return _page.evaluate(function() {
                return document.title;
            });
        }
    }).then(function(title) {
        console.log(title);
        if (title == "学分制综合教务") {
            return true;
        } else {
            throw "网络拥挤抓获取登录状态失败";
        }
    }).then(function() {
        return _page.property('cookies');
    }).then(function(cookie) {
        console.log(cookie);
        return cookie;
        _page.close();
        _ph.exit();
    });
}