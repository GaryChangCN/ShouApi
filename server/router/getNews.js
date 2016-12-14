var getCard=require('./../lib/getCard');

module.exports=function*(){
    try {
        var getNewsList = yield require('../lib/new').getNewsList();
        this.body = {
            err:false,
            data:getNewsList.data||[]
        }
    } catch (error) {
        this.body = {
            err: true
        }
    }
}