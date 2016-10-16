var get = require('./get');

var getBalance = function(cookie, md5) {
    var url = 'http://202.121.64.37/yktapi/?m=yktapi.Querycust&stuempno=' + md5;
    return getCard = get.get(cookie, url);
}

exports.getBalance = getBalance;