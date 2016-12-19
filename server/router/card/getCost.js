module.exports = function*(next) {
    try {
        var username = this.params.username;
        var start=this.params.start;
        var end=this.params.end;
        var info = yield require("./../login/getInfo")(username);
        var url = "http://202.121.64.37/yktapi/?m=yktapi.getxf&stuempno="+info.md5+"&startdate="+start+"&enddate="+end;
        var cost = yield require('../../lib/get').get(info.cookie, url);
        if (cost.expire) {
            this.body = {
                err: "登录过期重新登录"
            }
        } else {
            this.body={
                err:false,
                data:cost.data
            }
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}