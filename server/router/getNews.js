var getCard=require('./../myModules/getCard');

module.exports=function*(){
    try {
        var getNewsList = yield require('../myModules/new').getNewsList();
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