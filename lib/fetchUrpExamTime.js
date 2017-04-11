var fetchUrpData = require("./core/fetchUrpData");

async function fetchUrpExamDate(username,urppassword){
	var url="http://urp.shou.edu.cn/ksApCxAction.do?oper=getKsapXx";
	return await fetchUrpData(username, urppassword, url, analysis);
}

function analysis($){
	var list=[];
	$(".odd").map(function(){
		var tmp=[];
		$(this).children("td").map(function(){
			tmp.push($(this).text().trim());
		});
		list.push(tmp);
	});
	return list;
}

module.exports=fetchUrpExamDate;