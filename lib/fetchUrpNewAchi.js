var fetchUrpData = require("./core/fetchUrpData");

async function fetchUrpNewAchi(username, urppassword) {
    var url = "http://urp.shou.edu.cn/bxqcjcxAction.do";
    return await fetchUrpData(username, urppassword, url, analysis);
}

function analysis($) {
    var list = [];
    var childLen = $(".displayTag").find("tr").length;
    if (childLen > 1) {
        $(".displayTag>thead>tr").each(function(i, element) {
            if (i > 0) {
                list.push({
                    kch: $(this).children("td:nth-child(1)").text().trim(),
                    kxh: $(this).children("td:nth-child(2)").text().trim(),
                    kcm: $(this).children("td:nth-child(3)").text().trim(),
                    kcywm: $(this).children("td:nth-child(4)").text().trim(),
                    xf: $(this).children("td:nth-child(5)").text().trim(),
                    kcsx: $(this).children("td:nth-child(6)").text().trim(),
                    cj: $(this).children("td:nth-child(7)").text().trim()
                });
            }
        })
    }
    return list;
}

module.exports = fetchUrpNewAchi;