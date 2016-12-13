module.exports = function(info,_this) {
    var data = {
        username: info.username,
        password: info.password
    }
    return require('./login')(data).then(function(value) {
        return _this.db.User.update({ username: value.username }, value).exec();
    })
}