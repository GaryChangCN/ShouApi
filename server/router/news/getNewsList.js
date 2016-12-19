module.exports=function*(next){
    try {
        var url = 'http://202.121.64.37/News/?m=news.getChannel';
        var newsList =yield require("./../../lib/get").get('cookie', url);
        this.body = {
            err:false,
            data:newsList.data||[]
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}