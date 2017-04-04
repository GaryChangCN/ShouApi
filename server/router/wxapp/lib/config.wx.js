function cry(_id){
    var crypto=require("crypto");
    var key="gary0525";
    var encode=function(_id){
        var afterRandom=parseInt(Math.random()*1000)+_id;
        var cipher=crypto.createCipher('aes-256-cfb',key);
        var crypted=cipher.update(afterRandom,'utf8','hex');
        crypted+=cipher.final('hex');
        return crypted;
    }
    var decode=function(value){
        var decipher = crypto.createDecipher('aes-256-cfb', key);
        var dec = decipher.update(value, 'hex', 'utf8');
        dec += decipher.final('utf8');
        var _id=dec.slice(3)
        return _id;
    }
    return {
        encode,decode
    }
}


module.exports={
    appid:"wxc6e04b7bcc0fdf3c",
    secret:"b2b5f0e20eeae880089912b9013dc081",
    cry
}