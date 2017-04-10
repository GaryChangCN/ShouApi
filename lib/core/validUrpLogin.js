var request = require("superagent");

async function validUrpLogin(username,urppassword){
	return await request.post("http://urp.shou.edu.cn/loginAction.do").type('form').send({
		zjh:username,
		mm:urppassword
	}).then(function(res){
		if (res.text.indexOf("errorTop") >= 0) {
            return {
				data:{
					pass:false
				}
			}
        } else {
			var cookie=res.headers['set-cookie'][0].split(" ")[0];
			return {
				data:{
					pass:true,
					cookie
				}
			}
		}
	});
}

module.exports=validUrpLogin;