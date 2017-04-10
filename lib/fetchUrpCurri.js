var fetchUrpData = require("./core/fetchUrpData");

async function fetchUrpCurri(username, urppassword) {
    var url = "http://urp.shou.edu.cn/xkAction.do?actionType=6";
    return await fetchUrpData(username, urppassword, url, analysis);
}

function analysis($) {
    var templist = [];
    $("table tr").each(function(i) {
        if (i < 20 && i > 5) {
            var t2 = [];
            $(this).children("td").each(function(j) {
                var tmp = $(this).text();
                if (j > 0) {
                    t2.push(tmp.trim());
                }
            })
            templist.push(t2);
        }
    });
    templist.splice(4, 1);
    templist.splice(8, 1);
    templist[0].splice(0, 1);
    templist[4].splice(0, 1);
    templist[8].splice(0, 1);
	return templist;
}

module.exports = fetchUrpCurri;
