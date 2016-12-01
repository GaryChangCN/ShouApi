module.exports=function*(next){
    this.body = {
        err: true
    }
    throw new Error("错误");
}