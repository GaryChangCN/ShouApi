module.exports = function*(next) {
    try {
        var type = this.params.type;
        var username = this.params.username;
        var _this = this;
        if (type == "cache") {
            var data = yield this.db.Curr.findOne({ username: username }).exec().then(function(value) {
                if (value) {
                    return value;
                } else {
                    return require("./core")(username).then(function(classData) {
                        var d = {
                            username,
                            classData
                        }
                        _this.db.Curr.update({ username: username }, { $set: d }, { upsert: true }).exec();
                        return d;
                    });
                }
            });
        } else if (type == "fresh") {
            var data = yield require("./core")(username).then(function(classData) {
                var d = {
                    username,
                    classData
                }
                _this.db.Curr.update({ username: username }, { $set: d }, { upsert: true }).exec();
                return d;
            });
        }
        this.body = {
            err: false,
            data:data.classData,
            username:data.username,
            _id:data._id
        }
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}