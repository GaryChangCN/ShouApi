var db=require('../lib/db');

// pushAll();
pushUser("1357227")

var globalMessage=new db.Msg({
	title:"欢迎使用"+Math.random()*10,
	content:"当前版本0.1."+Math.random()*100
});

async function publishMsg(){
	var data=await globalMessage.save();
	var {_id,title}=data;
	_id=_id.toString();
	return {_id,title};
}

async function pushAll(){
	var {_id,title}=await publishMsg();
	var data={
		_id,title,
		read:false
	}
	await db.Wxapp.update({},{
		$push:{
			msg:data
		}
	},{multi:true});
	process.exit();
}

async function pushUser(usernameList){
	usernameList=Array.isArray(usernameList)?usernameList:[usernameList];
	var {_id,title}=await publishMsg();
	var data={
		_id,title,
		read:false
	}
	usernameList.forEach((username)=>{
		await db.Wxapp.update({username},{
			$push:{
				msg:data
			}
		}).exec()
	});
	process.exit();
}
