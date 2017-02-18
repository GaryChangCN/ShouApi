require('events').EventEmitter.prototype._maxListeners = 100;
var koa = require('koa');
var app = koa();
var logger = require('./lib/log');
var db = require('./lib/db');

var formidable = require('koa-formidable')
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: 'public/tmp',
    maxFieldsSize: 3145728,
    multiples: true
}));

var router = require('koa-router')();
router.prefix('/api');
app.use(router.routes());
app.use(router.allowedMethods())

app.context.db=db;
app.context.logger=logger;

var cors=require('./router/cors');
var err=require('./router/err');

app.on('error', function(err, ctx) {
    logger.error(err.message);
    logger.error(err);
});

router.post('/login',cors,require('./router/login/login'),err);
router.post('/urplogin',cors,require('./router/login/urpLogin'),err);
router.get('/getachievement/:username',cors,require('./router/getAchievement'),err);
router.get('/getcurriculum/:username/:type',cors,require('./router/getCurriculum'),err)
router.get('/getinfoplus/:username/:type',cors,require('./router/getInfoPlus'),err);
router.all('/address/:keywords',cors,require("./router/address/get"),require("./router/address/post"),require("./router/address/update"),err);
// router.get('/getbalance/:username',cors,require('./router/card/getBalance'),err);
// router.get('/getcost/:username/:start/:end',cors,require('./router/card/getCost'),err);
// router.get('/getnews',cors,require('./router/news/getNewsList'),err);


app.listen(8123, function () {
    console.log("listen on 8132");
});