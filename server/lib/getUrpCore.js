var charset=require("superagent-charset");
var request = require("superagent");
charset(request);

function core(url,info) {
    return new Promise(function(resolve,reject){
        request.post("http://urp.shou.edu.cn/loginAction.do").type('form').send({
            zjh:info.username,
            mm:info.password
        }).end(function(err,res){
            if(err||res.status!==200){
                reject(err);
            }else if(res.text.indexOf("errorTop")>=0){
                reject({msg:"账号密码错误",pass:false});
            }else{
                var cookie=res.headers['set-cookie'][0].split(" ")[0];
                request.get(url).set({
                    "Cookie":cookie,
                    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Cache-Control":"no-cache"
                }).charset('gbk').end(function(err,response){
                    if(err||response.status!==200){
                        reject(err);
                    }else{
                        resolve(response.text.toString());
                    }
                })
            }
        })
    });
}

module.exports=core;