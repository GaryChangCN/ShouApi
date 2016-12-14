var get = require('./get');
var getAchievement = function(cookie, md5) {
    var url = 'http://202.121.64.37/student/?m=student.GetXQ&xh=' + md5;
    var xq = get.get(cookie, url);
    xq.md5 = md5;
    return xq.then(function(value, md5) {
        if(!!value.data[0]){
            var url = 'http://202.121.64.37/student/?m=student.GetScoreForMoblie&xh=' + xq.md5 + '&xq=' + value.data[0].zxjxjhh;
            return get.get(cookie, url)
        }else{
            return false;
        }
    })
};

exports.getAchievement = getAchievement;