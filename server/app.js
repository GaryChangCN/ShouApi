var koa = require('koa');
var app = koa();
app.use(require('koa-trie-router')(app));

app.route('/api/login').post(function*(next) {
    try {
        var info = yield require('./myModules/login').info(this);
        this.body = info;
        this.set('Set-Cookie', info.cookie);
    } catch (error) {
        this.body = {
            err: true
        }
    }
});

app.route('/api/getcard/:md5').get(function*(next) {
    try {
        var md5 = this.params.md5 ? this.params.md5 : 'dedd';
        var cookie = this.header.cookie;
        var getCardInfo = yield require('./myModules/getCard').getBalance(cookie, md5);
        this.body = getCardInfo;
    } catch (error) {
        this.body = {
            err: true
        }
    }
})


console.log("listen 80");

app.listen(80)

// var getCard = require('./myModules/getCard');
// var getCardInfo = getCard.getCard('1357228', '240270');
// getCardInfo.then(function(value) {
//     console.log(value);
// }, function(err) {
//     console.log(err);
// })