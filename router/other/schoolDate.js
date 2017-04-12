var fetchMainData=require('../../lib/core/fetchMainData');
var hostname="http://jwzx.shou.edu.cn";

module.exports=async function (ctx,next){
	try {
		var url=hostname+"/edu_affair/xl.asp";
		var {data}=await fetchMainData(url,analysis);
		ctx.body={
			data:{
				schooolDate:data.ret
			}
		}
	} catch (error) {
		await next();
	}
}

function analysis($){
	var list=[];
	$('table[borderColor="#666666"]').map(function(){
		var title=$(this).find("span").text().match(/\d+\-\d+/)[0];
		var pic=[];
		$(this).find("a").map(function(){
			pic.push(hostname+$(this).children("img").attr("src").slice(2));
		});
		list.push({
			title,
			pic
		});
	});
	return list;
}