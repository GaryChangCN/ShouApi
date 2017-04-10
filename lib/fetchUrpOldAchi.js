var fetchUrpData=require("./core/fetchUrpData");

async function fetchUrpOldAchi(username,urppassword){
	var url='http://urp.shou.edu.cn/gradeLnAllAction.do?type=ln&oper=qbinfo&lnxndm=2016-2017%D1%A7%C4%EA%C7%EF(%C1%BD%D1%A7%C6%DA)';
	return await fetchUrpData(username,urppassword,url,analysis);
}

function analysis($){
	var a=[];
	$("#tblHead").map(function(){
		a.push({
			title:$(this).text().trim()
		});
	})
	$("#user").map(function(i){
		var tmp=[];
		$(this).children("tr").map(function(){
			var tmp2=[];
			$(this).children("td").map(function(){
				tmp2.push($(this).text().trim());
			});
			tmp.push(tmp2);
		})
		a[i].content=tmp;
	});
	return a;
}

module.exports=fetchUrpOldAchi;