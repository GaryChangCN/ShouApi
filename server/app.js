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

router.prefix('/api');

app.on('error', function(err, ctx) {
    logger.error(err.message);
    logger.error(err);
});

app.context.db = db;
app.context.logger = logger;


var cors = require('./router/cors');
var err = require("./router/err");
// router.post('/login', cors, require('./router/login/login'), err);
// router.post('/urplogin', cors, require('./router/login/urpLogin'), err);
// router.get('/getachievement/:username', cors, require('./router/getAchievement'), err);
// router.get('/getcurriculum/:username/:type', cors, require('./router/getCurriculum'), err)
// router.get('/getinfoplus/:username/:type', cors, require('./router/getInfoPlus'), err);
router.all('/address/:keywords', cors, require("./router/address/get"), require("./router/address/post"), require("./router/address/update"), err);

router.get('/getnewslist',require("./router/news/getNewsList"),err);
router.get('/getnewsdetail',require("./router/news/getNewsDetail"),err);


router.post('/wxapp/urplogin', require("./router/wxapp/urpLogin"), err);
router.get('/wxapp/fetchinfoplus', require("./router/wxapp/fetchInfoPlus"), err);
router.get('/wxapp/fetchcurriculum', require("./router/wxapp/fetchCurriculum"), err);
router.get('/wxapp/fetchbindurp', require("./router/wxapp/fetchBindUrp"), err);
router.get('/wxapp/fetchachievement', require("./router/wxapp/fetchAchievement"), err);
router.post('/wxapp/fetchthirdsession', require("./router/wxapp/fetchThirdSession"), err);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7777, function() {
    console.log("listen on 7777");
});