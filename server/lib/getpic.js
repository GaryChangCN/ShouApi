var url = "http://urp.shou.edu.cn/xjInfoAction.do?oper=img";
var request = require("superagent");
var fs = require("fs");
var path=require("path");

function getPic(username, urpPassword) {
    return new Promise(function(resolve,reject){
        var filePath=path.normalize(__dirname+"/../public/pic/"+username + '.jpg');
        if (!fs.existsSync(filePath))  {
            request.post("http://urp.shou.edu.cn/loginAction.do").type('form').send({
                zjh: username,
                mm: urpPassword
            }).end(function(err, res) {
                if (err || res.status !== 200) {
                    reject(err);
                } else if (res.text.indexOf("errorTop") >= 0) {
                    reject({ msg: "账号密码错误", pass: false });
                } else {
                    var cookie = res.headers['set-cookie'][0].split(" ")[0];
                    var file = fs.createWriteStream(filePath);
                    file.on('finish', function() {
                        resolve(true);
                    });
                    request.get(url).set({
                        "Cookie": cookie,
                        "Accept": "image/jpg,image/*,*/*;q=0.8",
                        "Cache-Control": "no-cache"
                    }).pipe(file);
                }
            });
        }else{
            resolve(true);
        }
    })
}

module.exports=getPic;