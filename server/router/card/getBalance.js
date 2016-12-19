module.exports = function*(next) {
    try {
        var username = this.params.username;
        var info = yield require("./../login/getInfo")(username);
        var url = "http://202.121.64.37/yktapi/?m=yktapi.Querycust&stuempno=" + info.md5;
        var balance = yield require('../../lib/get').get(info.cookie, url);
        if (balance.expire) {
            this.body = {
                err: "登录过期重新登录"
            }
        } else {
            this.body = {
                data: {
                    stuempno: balance.data.stuempno,
                    custname: balance.data.custname,
                    custtype: balance.data.custtype,
                    deptname: balance.data.deptname,
                    cardno: balance.data.cardno,
                    balance: balance.data.balance
                },
                err: false
            }
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}