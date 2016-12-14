require('events').EventEmitter.prototype._maxListeners = 100;
var koa = require('koa');
var app = koa();
var logger = require('./lib/log');
var db = require('./lib/mongo');

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

var cors=require('./router/cors');
var err=require('./router/err');

app.on('error', function(err, ctx) {
    logger.error(err.message);
    logger.error(err);
});

router.post('/login',cors,require('./router/login'),err);
router.get('/getbalance/:username',cors,require('./router/getBalance'),err);
router.get('/getlog/:username/:start/:end',cors,require('./router/getLog'),err);
router.get('/getnews',cors,require('./router/getNews'),err);
router.get('/getachievement/:username',cors,require('./router/getAchievement'),err);



app.listen(8123, function () {
    console.log("listen on 8132");
});