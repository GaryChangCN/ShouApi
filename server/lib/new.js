var get = require('./get');

var getNewsList = function() {
    var url = 'http://202.121.64.37/News/?m=news.getChannel';
    return get.get('cookie', url);
}

exports.getNewsList = getNewsList;