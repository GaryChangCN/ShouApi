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
            national: list[25],
            political: list[31],
            highSchoolExam: list[37],
            highSchoolName: list[35],
            address: list[45],
            parents: list[49],
            college: list[53],
            major: list[55],
            className: list[61],
            room: list[73],
            pic:username+".jpg"
        }
        return infoPlus;
    }).then(function(infoPlus) {
        var url="http://urp.shou.edu.cn/userInfo.jsp";
        return require("./../lib/getUrpCore")(url, { username, password: urpPassword }).then(function(res) {
            var $ = cheerio.load(res, { normalizeWhitespace: true });
            var list = [];
            $("input").each(function(i){
                list.push($(this).val());
            });
            infoPlus.phoneNumber=list[1];
            infoPlus.email=list[3];
            return infoPlus;
        });
    }).then(function (infoPlus) {
        return require("./../lib/getPic")(username,urpPassword).then(function(state){
            if(state){
                return infoPlus;
            }
        });
    });
}

module.exports =async function(ctx,next,username,type) {
    try {
        console.log(username,type);
        var username =username|| ctx.params.username;
        var type =type|| ctx.params.type;
        if (type == "cache") {
            //先检测数据库钟是否有缓存，有的话直接返回，没有则重新发起请求
            var data = await ctx.db.InfoPlus.findOne({ username: username }).exec().then(function(value) {
                if (value) {
                    return value;
                } else {
                    return require("./login/getInfo")(username).then(function(info) {
                        return get(info.username, info.urpPassword).then(function(data) {
                            ctx.db.InfoPlus.update({ username: username }, { $set: data }, { upsert: true }).exec();
                            return data;
                        });
                    });
                }
            });
        } else if (type == "fresh") {
            //返回新的数据，并且更新缓存数据库
            var info = await require("./login/getInfo")(username);
            var data = await get(info.username, info.urpPassword);
            ctx.db.InfoPlus.update({ username: username }, { $set: data }, { upsert: true }).exec();
        } else {
            await next();
        }
        ctx.body = {
            err: false,
            data: data
        }
    } catch (error) {
        ctx.logger.error(error);
        await next();
    }
}