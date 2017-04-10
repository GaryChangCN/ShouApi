var fetchMainData = require("./core/fetchMainData");

var hostname = "http://www.shou.edu.cn";

async function fetchMainNewsDetail(url) {
	if(!url){
		return {
			data:{
				ret:{
					list:[],
					title:"没有文章内容",
					meta:""
				}
			}
		}
	}
    return await fetchMainData(hostname + url, analysis);
}

function analysis($) {
    var list = [];
    $(".wp_articlecontent p").each(function(i) {
        if ($(this).children("img").length > 0) {
            $(this).children("img").each(function(j) {
                var src = $(this).attr("src");
                if (src.indexOf("http") != 0) {
                    src = hostname + src;
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
	return {
		list,
		title:$(".arti_title").text(),
		meta:$(".arti_metas").text().replace("设置","")
	}
}

module.exports = fetchMainNewsDetail;