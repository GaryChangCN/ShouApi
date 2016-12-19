module.exports = function*(next) {
    if (this.method.toUpperCase() == "POST") {
        try {
            var data=this.request.body;
            var name=data.name;
            var email=data.email;
            var number=data.number;
            var mobile=data.mobile;
            var position=data.position;
            var a=new this.db.Address({
                name,
                email,
                number,
                mobile,
                position
            });
            yield a.save();
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