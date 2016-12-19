module.exports = function*(next) {
    try {
        var username = this.params.username;
        var info = yield require("./../login/getInfo")(username);
        var url = "http://202.121.64.37/student/?m=student.GetXQ&xh=" + info.md5;
        var xq = yield require('../../lib/get').get(info.cookie, url);
        if (xq.expire) {
            this.body = {
                err: "登录过期重新登录"
            }
        } else {
            var newXq = xq.data[0].zxjxjhh;
            var url2 = "http://202.121.64.37/student/?m=student.GetScoreForMoblie&xq=" + newXq;
            var achi = yield require('../../lib/get').get(info.cookie, url2);
            if (achi.expire) {
                this.body = {
                    err: "登录过期重新登录"
                }
            }else{
                this.body={
                    err:false,
                    data:achi.data
                }
            }
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}