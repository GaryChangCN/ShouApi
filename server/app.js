require('events').EventEmitter.prototype._maxListeners = 100;
var koa = require('koa');
var app = koa();
var getCard = require('./myModules/getCard');
var fs = require('fs');
var db = require('./myModules/mongo');
app.use(require('koa-trie-router')(app));

app.route('/api/login').post(function* (next) {
    try {
        var info = yield require('./myModules/login').info(this);
        this.body = info;
        fs.writeFile('./cookie.json', JSON.stringify(info));
        // var saveDb = new db.User(info);
        // saveDb.save(function (err, doc) {
        //     console.log("doc" + doc);
        // });
        db.User.update({ username: info.username }, info, function (err, doc) {
            console.log(doc);
        })
        yield next;
    } catch (error) {
        console.log(error);
        this.body = {
            err: true
        }
        yield next;
    }
}, function* () {
    this.set('Access-Control-Allow-Origin', '*');
});

app.route('/api/getcard/getbalance/:md5').get(function* (next) {
    try {
        var md5 = this.params.md5;
        var promise = new Promise(function (resolve, reject) {
            db.User.findOne({ username: '1357216' }, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc)
                }
            });
        });
        var info = yield promise;
        console.log("1");
        console.log(info.cookie);
        var xx = fs.readFileSync('./cookie.json');
        console.log("2");
        console.log(JSON.parse(xx).cookie);
        console.log("3");
        var getCardInfo = yield getCard.getBalance(info.cookie, md5);
        this.body = getCardInfo;
        yield next;
    } catch (error) {
        this.body = {
            err: true
        }
        yield next;
    }
}, function* () {
    this.set('Access-Control-Allow-Origin', '*');
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