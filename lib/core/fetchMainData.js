var request = require("superagent");
var cheerio = require("cheerio");

async function fetchMainData(url,analysis){
	var res=await request.get(url);
	var text=res.text.toString();
	var $=cheerio.load(text,{normalizeWhitespace:true})
	var ret=analysis($);
	return {
		data:{
			ret
		}
	}
}

module.exports=fetchMainData;