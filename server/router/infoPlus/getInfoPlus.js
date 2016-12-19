module.exports = function*(next) {
    try {
        var type = this.params.type;
        var username = this.params.username;
        var _this = this;
        if (type == "cache") {
            var data = yield this.db.InfoPlus.findOne({ username: username }).exec().then(function(value) {
                if (value) {
                    return value;
                } else {
                    return require("./core")(username).then(function(InfoPlusData) {
                        _this.db.InfoPlus.update({ username: username }, { $set: InfoPlusData }, { upsert: true }).exec();
                        return InfoPlusData;
                    });
                }
            });
        } else if (type == "fresh") {
            var data = yield require("./core")(username).then(function(InfoPlusData) {
                _this.db.InfoPlus.update({ username: username }, { $set: InfoPlusData }, { upsert: true }).exec();
                return InfoPlusData;
            });
        }
        this.body = {
            err: false,
            data
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}