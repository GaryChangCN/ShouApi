require('events').EventEmitter.prototype._maxListeners = 100;
var koa = require('koa');
var app = koa();
var getCard = require('./myModules/getCard');
var logger = require('./myModules/log');
var db = require('./myModules/mongo');
app.use(require('koa-trie-router')(app));


app.route('/api/login').post(function* (next) {
    try {
        var info = yield require('./myModules/login').info(this);
        db.User.find({
            username: info.username
        }, function (err, doc) {
            if (err) {
                logger.error("id:0" + err);
            }
            if (doc.length == 0) {
                var saveDb = new db.User(info);
                saveDb.save(function (err, doc) {
                    if (err) {
                        logger.error("id:1" + err);
                    }
                });
            } else {
                db.User.update({
                    username: info.username
                }, {
                        cookie: info.cookie
                    }, function (err, doc) {
                        if (err) {
                            logger.error("id:2" + err);
                        }
                    });
            }
        });
        this.body = info;
        yield next;
    } catch (error) {
        logger.error("id:3" + error);
        this.body = {
            err: true
        }
        yield next;
    }
}, function* () {
    this.set('Access-Control-Allow-Origin', '*');
});

app.route('/api/:username/getcard/getbalance').get(function* (next) {
    try {
        var username = this.params.username;
        var promise = db.User.findOne({
            username: username
        }).exec();
        console.log(username);
        var info = yield promise;
        var getCardInfo = yield getCard.getBalance(info.cookie, info.md5);
        this.body = getCardInfo;
        yield next;
    } catch (error) {
        logger.error("id:4" + error);
        this.body = {
            err: true
        }
        yield next;
    }
}, function* () {
    this.set('Access-Control-Allow-Origin', '*');
});

app.route('/api/:username/getcard/getlog/:start/:end/:md5').get(function* (next) {
    try {
        var getLog = yield getCard.getLog(this.header.cookie, this.params.md5, this.params.start, this.params.end);
        this.body = getLog;
    } catch (error) {
        logger.error("id:5" + error);
        this.body = {
            err: true
        }
    }
});

app.route('/api/:username/news/getnewslist').get(function* (next) {
    try {
        var getNewsList = yield require('./myModules/new').getNewsList();
        this.body = getNewsList;
    } catch (error) {
        logger.error("id:6" + error);
        this.body = {
            err: true
        }
    }
});

app.route('/api/:username/getachievement/:md5').get(function* (next) {
    try {
        var getAchievement = yield require('./myModules/getAchievement').getAchievement(this.header.cookie, this.params.md5);
        this.body = getAchievement;
    } catch (error) {
        logger.error("id:7" + error);
        this.body = {
            err: true
        }
    }
});



app.listen(80, function () {
    logger.info("listen on 80");
});