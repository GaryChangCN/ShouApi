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
                        list.push({
                            img: pathname + $(this).attr("src")
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
                    list
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