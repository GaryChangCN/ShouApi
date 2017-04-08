var request = require("superagent");
var cheerio = require("cheerio");

module.exports = async function fetchNewsList(ctx, next) {
    try {
        var pathname = "http://www.shou.edu.cn";
        var {url}=ctx.query;
        if(url){
            var res = await request.get(pathname + url);
            var text = res.text.toString();
            var $ = cheerio.load(text, { normalizeWhitespace: true });
            var list = [];
            $(".wp_articlecontent p").each(function(i) {
                if ($(this).children("img").length > 0) {
                    $(this).children("img").each(function(j) {
                        var src=$(this).attr("src");
                        if(src.indexOf("http")!=0){
                            src=pathname+src;
                        }
                        list.push({
                            img: src
                        });
                    });
                } else {
                    list.push({
                        p: $(this).text()
                    });
                }
            });
            ctx.body = {
                data: {
                    list,
                    title:$(".arti_title").text(),
                    meta:$(".arti_metas").text().replace("设置","")
                }
            }
        }else{
            ctx.body={
                err:{
                    mesage:"没有传入url"
                }
            }
        }
    } catch (error) {
        await next();
    }
}