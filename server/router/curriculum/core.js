var request = require("request");
var jsdom = require("jsdom");
var db=require('./../../lib/db');
module.exports=function(username){
    return db.User.findOne({ username: username }, 'password username').exec().then(function(info){
        return require('../../lib/getUrpCookie')(info);
    }).then(function(cookieArr){
        var cookie = cookieArr[0].split(";").shift();
        var url = "http://urp.shou.edu.cn/xkAction.do?actionType=6";
        return require("./../../lib/get").getUrp(cookie, url);
    }).then(function(res){
        return new Promise(function(resolve, reject) {
            jsdom.env(res, [], function(err, window) {
                if (err) {
                    reject(err);
                } else {
                    var classTable = window.document.querySelectorAll("#user")[0];
                    var first = classTable.querySelectorAll("tr:nth-child(2)>td");
                    var firstArray = Array.from(first).slice(2).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var second = classTable.querySelectorAll("tr:nth-child(3)>td");
                    var secondArray = Array.from(second).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var third = classTable.querySelectorAll("tr:nth-child(4)>td");
                    var thirdArray = Array.from(third).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var fourth = classTable.querySelectorAll("tr:nth-child(5)>td");
                    var fourthArray = Array.from(fourth).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var fifth = classTable.querySelectorAll("tr:nth-child(7)>td");
                    var fifthArray = Array.from(fifth).slice(2).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var sixth = classTable.querySelectorAll("tr:nth-child(8)>td");
                    var sixthArray = Array.from(sixth).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var seventh = classTable.querySelectorAll("tr:nth-child(9)>td");
                    var seventhArray = Array.from(seventh).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var eighth = classTable.querySelectorAll("tr:nth-child(10)>td");
                    var eighthArray = Array.from(eighth).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var ninth = classTable.querySelectorAll("tr:nth-child(12)>td");
                    var ninthArray = Array.from(ninth).slice(2).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var tenth = classTable.querySelectorAll("tr:nth-child(13)>td");
                    var tenthArray = Array.from(tenth).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var eleventh = classTable.querySelectorAll("tr:nth-child(14)>td");
                    var eleventhArray = Array.from(eleventh).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var twelfth = classTable.querySelectorAll("tr:nth-child(15)>td");
                    var twelfthArray = Array.from(twelfth).slice(1).map(function(e) {
                        return e.innerHTML.replace(/(&nbsp;|\s|<br>)/g, "");
                    });
                    var tmp = [];
                    tmp.push(firstArray, secondArray, thirdArray, fourthArray, fifthArray, sixthArray, seventhArray, eighthArray, ninthArray, tenthArray, eleventhArray, twelfthArray)
                    var arr = [];
                    for (let i = 0; i < 7; i++) {
                        var col = [];
                        for (let j = 0; j < 12; j++) {
                            col.push(tmp[j][i])
                        }
                        arr.push(col);
                    }
                    resolve(arr);
                }
            })
        });
    })
}
