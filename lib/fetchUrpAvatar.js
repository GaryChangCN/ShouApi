var url = "http://urp.shou.edu.cn/xjInfoAction.do?oper=img";
var request = require("superagent");
var fs = require("fs");
var path = require("path");
var validUrpLogin = require("./core/validUrpLogin");


async function fetchUrpAvatar(username, urppassword) {
    var filePath = path.normalize(__dirname + "/../public/pic/" + username + '.jpg');
    if (!fs.existsSync(filePath)) {
        var { data } = await validUrpLogin(username, urppassword);
        var { pass, cookie } = data;
        if (pass) {
            var file = fs.createWriteStream(filePath);
            request.get(url).set({
                "Cookie": cookie
            }).accept("jpg").pipe(file);
			return {
				data:{
					pass:true,
					path:username+".jpg"					
				}
			}
        }else{
			return {
				data:{
					pass:false
				}
			}
		}
    }else{
		return {
			data:{
				pass:true,
				exit:true,
				path:username+".jpg"
			}
		}
	}
}

module.exports=fetchUrpAvatar;