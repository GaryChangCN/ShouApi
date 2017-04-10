var fetchUrpData = require("./core/fetchUrpData");

async function fetchUrpInfoPlus(username, urppassword) {
    var url = "http://urp.shou.edu.cn/xjInfoAction.do?oper=xjxx";
    var analysis = pack(username);
    return await fetchUrpData(username, urppassword, url, analysis);
}

function pack(username) {
	return function analysis($) {
        var list = [];
        $("#tblView:first-child td").each(function(i, element) {
            list.push($(this).text().trim());
        });
        var infoPlus = {
            name: list[3],
            idCard: list[13],
            national: list[25],
            political: list[31],
            highSchoolExam: list[37],
            highSchoolName: list[35],
            address: list[45],
            parents: list[49],
            college: list[53],
            major: list[55],
            className: list[61],
            room: list[73],
            pic: username + ".jpg"
        }
        return infoPlus;
    }
}
module.exports = fetchUrpInfoPlus;