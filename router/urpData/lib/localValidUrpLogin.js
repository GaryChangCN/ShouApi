var db=require('../../../lib/db');

module.exports=async function (username,urppassword){
	var {username,urpPassword}=await db.User.findOne({username}).exec();
	if(urpPassword==urppassword){
		return {
			pass:true
		}
	}
	return {
		pass:false
	}
}