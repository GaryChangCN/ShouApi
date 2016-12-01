module.exports=function*(next){
    this.set('Access-Control-Allow-Origin', '*');
    yield next;
}