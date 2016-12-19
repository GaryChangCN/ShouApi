var request = require("request");
var jsdom = require("jsdom");
var db = require('./../../lib/db');
var path=require("path");
var fs=require("fs");

function trimP(element) {
    return element.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
}

function selectTable(element, tr, td) {
    return element.querySelectorAll("tr")[tr].querySelectorAll("td")[td];
}
module.exports = function(username) {
    var un=username;
    var cc = "";
    return db.User.findOne({ username: username }, 'password username').exec().then(function(info) {
        return require('../../lib/getUrpCookie')(info);
    }).then(function(cookieArr) {
        var cookie = cookieArr[0].split(";").shift();
        cc = cookie;
        var url = "http://urp.shou.edu.cn/xjInfoAction.do?oper=xjxx";
        return require("./../../lib/get").getUrp(cookie, url);
    }).then(function(res) {
        return new Promise(function(resolve, reject) {
            jsdom.env(res, [], function(err, window) {
                if (err) {
                    reject(err);
                } else {
                    var mainTable = window.document.querySelectorAll("#tblView:first-child>tbody")[0];
                    var username = un;
                    var name = trimP(selectTable(mainTable, 0, 3));
                    var idCard = trimP(selectTable(mainTable, 2, 3));
                    var national = trimP(selectTable(mainTable, 5, 3));
                    var highSchoolName = trimP(selectTable(mainTable, 8, 1));
                    var highSchoolExam = trimP(selectTable(mainTable, 8, 3)) || "未储存"
                    var address = trimP(selectTable(mainTable, 10, 3));
                    var parents = trimP(selectTable(mainTable, 11, 3));
                    var college = trimP(selectTable(mainTable, 12, 3));
                    var major = trimP(selectTable(mainTable, 13, 1));
                    var className = trimP(selectTable(mainTable, 14, 3));
                    var room = trimP(selectTable(mainTable, 17, 3));
                    var data={username,name,idCard,national,highSchoolExam,highSchoolName,address,parents,college,major,className,room};
                    var d=path.normalize(path.join(__dirname,"../../public/pic"));
                    var dirArr=fs.readdirSync(d);
                    if(dirArr.indexOf(username+".webp")<0){
                        var streamWebp=fs.createWriteStream(d+"/"+username+".webp")
                        require("request").get({
                            url: "http://urp.shou.edu.cn/xjInfoAction.do?oper=img",
                            headers: {
                                'Cookie': cc
                            }
                        }).pipe(streamWebp);
                        streamWebp.on("error",function(err){
                            reject(err);
                        });
                        streamWebp.on("close",function(){
                            resolve(data)
                        })
                    }else{
                        resolve(data);
                    }
                }
            })
        })
    })
}