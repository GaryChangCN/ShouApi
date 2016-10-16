var get = require('./get');

var getBalance = function(cookie, md5) {
    var url = 'http://202.121.64.37/yktapi/?m=yktapi.Querycust&stuempno=' + md5;
    return get.get(cookie, url);
}

var getLog = function(cookie, md5, start, end) {
    var url = 'http://202.121.64.37/yktapi/?m=yktapi.getxf&stuempno=' + md5 + '&startdate=' + start + '&enddate=' + end;
    return get.get(cookie, url);
}

exports.getBalance = getBalance;
exports.getLog = getLog;