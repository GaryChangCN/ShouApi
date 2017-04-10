require('events').EventEmitter.prototype._maxListeners = 100;
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var router = new Router();
var logger = require('./lib/log');
var db = require('./lib/db');

var formidable = require('koa2-formidable')
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: 'public/tmp',
    maxFieldsSize: 3145728,
    multiples: true
}));
app.on('error', function(err, ctx) {
    logger.error(err.message);
    logger.error(err);
});
app.context.db = db;
app.context.logger = logger;
var cors = require('./router/cors');
var err = require("./router/err");

router.prefix('/api');
router.post('/login',require("./router/login"),err);
router.post('/address',require("./router/address"),err);
router.get('/newslist',require("./router/news/list"),err);
router.get('/newsDetail',require("./router/news/detail"),err);

//传统urp

router.post('/curri',require("./router/urpData/curri"),err);


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7777, function() {
    console.log("listen on 7777");
});