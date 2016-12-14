var phantom=require("phantom");

var _ph,_page,_outObj;
phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']).then(function(ph){
    _ph=ph;
    return _ph.createPage();
}).then(function(page){
    _page=page;
    return _page.setting('javascriptEnabled','true');
}).then(function(){
    return _page.property('onConsoleMessage',function(msg){
        console.log(msg);
    });
}).then(function(){
    return _page.open("http://urp.shou.edu.cn/");
}).then(function(){
    var p= _page.evaluate(function(){
        document.querySelector("input[name=zjh]").value="";
        document.querySelector("input[name=mm]").value="";
        document.getElementById("btnSure").click();
    });
    return p;
}).then(function(){
    return new Promise(function(reslove,reject){
        setTimeout(function() {
            reslove(true)
        }, 5000);
    })
}).then(function(){
    return _page.property('cookies');
}).then(function(content){
    console.log(content);
    _page.close();
    _ph.exit();
}).catch(err=>console.log(err))