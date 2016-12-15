var jsdom=require("jsdom");
var html=require("fs").readFileSync("../xx.html").toString();
jsdom.env(html,[],function(err,window){
    var classTable=window.document.querySelectorAll("#user")[0];
    var week=classTable.querySelectorAll("tr:first-child>td>div");
    var weekArray=Array.from(week).map(function(e){
        return e.innerHTML.match(/[\u4e00-\u9fa5]+/)[0];
    })
    var first=classTable.querySelectorAll("tr:nth-child(2)>td");
    var firstArray=Array.from(first).slice(2).map(function(e){
        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g,"");
    })
   console.log(firstArray);
})