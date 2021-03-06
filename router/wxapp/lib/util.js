var {key}=require('../../../wxappConfig');

function cry(){
    var crypto=require("crypto");
    var encode=function(_id){
        var afterRandom=(Math.random()*1000).toFixed(0)+_id.toString();
        var cipher=crypto.createCipher('aes-256-cfb',key);
        var crypted=cipher.update(afterRandom,'utf8','hex');
        crypted+=cipher.final('hex');
        return crypted;
    }
    var decode=function(value){
        var decipher = crypto.createDecipher('aes-256-cfb', key);
        var dec = decipher.update(value, 'hex', 'utf8');
        dec += decipher.final('utf8');
        var _id=dec.slice(3);
        return _id;
    }
    return {
        encode,decode
    }
}


module.exports={
    cry
}