module.exports = function*(next) {
    if (this.method.toUpperCase() == "PUT") {
        try {
            var _id=this.request.body._id;
            var change=this.request.body.change;
            yield this.db.Address.update({_id:_id},{$set:change}).exec();
            this.body={
                err:false
            }
        } catch (error) {
            this.logger.error(error);
            yield next;
        }
    } else {
        yield next;
    }
}