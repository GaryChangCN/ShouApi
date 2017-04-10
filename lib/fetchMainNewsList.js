var fetchMainData = require("./core/fetchMainData");

async function fetchMainNewsList(pn="1", type="yw") {
    var hostname = "http://www.shou.edu.cn";
    var url = `${hostname}/${type}/list${pn}.htm`;
    return await fetchMainData(url,analysis);
}

function analysis($) {
    var list = []
    $("#wp_news_w8 .col_news_item").each(function() {
        var tmp = {};
        tmp.href = $(this).attr("href");
        tmp.title = $(this).children(".col_news_title").text();
        tmp.time = $(this).children(".col_news_date").text();
        list.push(tmp);
    });
	return list;
}

module.exports=fetchMainNewsList;