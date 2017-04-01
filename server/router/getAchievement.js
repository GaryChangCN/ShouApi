var cheerio=require("cheerio");
module.exports =async function(ctx,next) {
    try {
        var username = ctx.params.username;
        var info = await require("./login/getInfo")(username);
        var url = "http://urp.shou.edu.cn/bxqcjcxAction.do";
        var res=await require("./../lib/getUrpCore")(url,{username,password:info.urpPassword});
        var $=cheerio.load(res,{normalizeWhitespace:true});
        var childLen=$(".displayTag").find("tr").length;
        if(childLen<=1){
            ctx.body={
                err:false,
                data:[]
            }
        }else{
            var list=[];
            $(".displayTag>thead>tr").each(function (i,element) {
                if(i>0){
                    list.push({
                        kch:$(this).children("td:nth-child(1)").text().trim(),
                        kxh:$(this).children("td:nth-child(2)").text().trim(),
                        kcm:$(this).children("td:nth-child(3)").text().trim(),
                        kcywm:$(this).children("td:nth-child(4)").text().trim(),
                        xf:$(this).children("td:nth-child(5)").text().trim(),
                        kcsx:$(this).children("td:nth-child(6)").text().trim(),
                        cj:$(this).children("td:nth-child(7)").text().trim()
                    });
                }
            })
            ctx.body={
                data:list
            };
        }
    } catch (error) {
        ctx.logger.error(error);
        await next();
    }
}