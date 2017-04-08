var request = require("superagent");
var cheerio=require("cheerio");

module.exports=async function fetchNewsList(ctx,next){
    try {
        var pn=ctx.query.pn||1;
        var type=ctx.query.type||"yw";
        var hostname="http://www.shou.edu.cn";
        var res=await request.get(`${hostname}/${type}/list${pn}.htm`)
        var text=res.text.toString();
        var $=cheerio.load(text,{normalizeWhitespace:true})
        var list=[]
        var a=$("#wp_news_w8 .col_news_item").each(function(){
            var tmp={};
            tmp.href=$(this).attr("href");
            tmp.title=$(this).children(".col_news_title").text();
            tmp.time=$(this).children(".col_news_date").text();
            list.push(tmp);
        });
        ctx.body={
            data:{
                list
            }
        }
    } catch (error) {
        await next();
    }
}