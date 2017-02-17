var cheerio = require("cheerio");

var get = function(username, urpPassword) {
    var url = "http://urp.shou.edu.cn/xjInfoAction.do?oper=xjxx";
    return require("./../lib/getUrpCore")(url, { username, password: urpPassword }).then(function(res) {
        var $ = cheerio.load(res, { normalizeWhitespace: true });
        var list = [];
        $("#tblView:first-child td").each(function(i, element) {
            list.push($(this).text().trim());
        });
        var infoPlus = {
            name: list[3],
            idCard: list[13],
            national: list[24],
            political: list[31],
            highSchoolExam: list[37],
            highSchoolName: list[35],
            address: list[45],
            parents: list[49],
            college: list[53],
            major: list[55],
            className: list[61],
            room: list[73]
        }
        return infoPlus;
    }).then(function(infoPlus) {
        var url="http://urp.shou.edu.cn/userInfo.jsp";
        return require("./../lib/getUrpCore")(url, { username, password: urpPassword }).then(function(res) {
            var $ = cheerio.load(res, { normalizeWhitespace: true });
            var list = [];
            $("input").each(function(i){
                list.push($(this).val());
            })
            infoPlus.phoneNumber=list[1];
            infoPlus.email=list[3];
            return infoPlus;
        })
    })
}

module.exports = function*(next) {
    try {
        var username = this.params.username;
        var type = this.params.type;
        var _this = this;
        if (type == "cache") {
            var data = yield this.db.InfoPlus.findOne({ username: username }).exec().then(function(value) {
                if (value) {
                    return value;
                } else {
                    return require("./login/getInfo")(username).then(function(info) {
                        return get(info.username, info.urpPassword).then(function(data) {
                            _this.db.InfoPlus.update({ username: username }, { $set: data }, { upsert: true }).exec();
                            return data;
                        });
                    });
                }
            });
        } else if (type == "fresh") {
            var info = yield require("./login/getInfo")(username);
            var data = yield get(info.username, info.urpPassword);
            _this.db.InfoPlus.update({ username: username }, { $set: data }, { upsert: true }).exec();
        } else {
            yield next;
        }
        this.body = {
            err: false,
            data: data
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}