module.exports = function*(next) {
    if (this.method.toUpperCase() == "GET") {
        try {
            var keywords = this.params.keywords;
            var reg = new RegExp(keywords);
            var a = yield this.db.Address.find({ $or: [{ name: reg }, { mobile: reg }] }).exec();
            this.body = {
                err: false,
                data: a
            }
        } catch (error) {
            this.logger.error(error);
            yield next;
        }
    } else {
        yield next;
    }
}