var koa = require('koa');
var app = koa();
var getCard = require('./myModules/getCard')

app.use(require('koa-trie-router')(app));

app.route('/api/login').post(function* (next) {
    try {
        var info = yield require('./myModules/login').info(this);
        this.body = info;
        this.set('Set-Cookie', info.cookie);
        yield next;
    } catch (error) {
        this.body = {
            err: true
        }
    }
}, function* () {
    this.set('Access-Control-Allow-Origin', '*');
});

app.route('/api/getcard/getbalance/:md5').get(function* (next) {
    try {
        var md5 = this.params.md5;
        var cookie = this.header.cookie;
        var getCardInfo = yield getCard.getBalance(cookie, md5);
        this.body = getCardInfo;
    } catch (error) {
        this.body = {
            err: true
        }
    }
});

app.route('/api/getcard/getlog/:start/:end/:md5').get(function* (next) {
    try {
        var getLog = yield getCard.getLog(this.header.cookie, this.params.md5, this.params.start, this.params.end);
        this.body = getLog;
    } catch (error) {
        this.body = {
            err: true
        }
    }
});

app.route('/api/news/getnewslist').get(function* (next) {
    try {
        var getNewsList = yield require('./myModules/new').getNewsList();
        this.body = getNewsList;
    } catch (error) {
        this.body = {
            err: true
        }
    }
});

app.route('/api/getachievement/:md5').get(function* (next) {
    try {
        var getAchievement = yield require('./myModules/getAchievement').getAchievement(this.header.cookie, this.params.md5);
        this.body = getAchievement;
    } catch (error) {
        console.log(error);
        this.body = {
            err: true
        }
    }
});



app.listen(80, function () {
    console.log("listen in 80");
});