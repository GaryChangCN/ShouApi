var { Msg, UserMsg, Wxapp } = require('../lib/db');


//使用说明
//push函数第一个参数是要推送的用户名，可以是 “all”代表向所有注册用户推送
//可以是一个数组，数组每项是用户名,代表向这些用户推送
//第二个参数是消息对象，分为title字段和content字段


// push([1357228, 1357227]);
push("all",{title:"新推送",content:"推送内容"})

function push(userList, msg = {
    title: "消息标题",
    content: "消息内容"
}) {
    var tmp = [];
    if (userList === "all") {
        Wxapp.find({},'username').then((res) => {
            res.forEach(({ username }) => {
				console.log(username);
                username = username + "";
                tmp.push(createMessage(msg).then(({ _id, title }) => {
                    var obj = {
                        msgId: _id.toString(),
                        title,
                        read: false,
                        delete: false,
                        detail: true
                    }
                    return UserMsg.update({ username }, { $push: { msgList: obj } }, { upsert: true }).exec();
                }))
            });
			return Promise.all(tmp);
        }).then((res)=>{
			console.log(res);
			console.log("推送完成");
			process.exit();
		}).catch((err)=>{
			console.error(err);
		})
    } else {
        if (!Array.isArray(userList)) {
            userList = [userList]
        }
        userList.forEach((username) => {
            username = username + "";
            tmp.push(createMessage(msg).then(({ _id, title }) => {
                var obj = {
                    msgId: _id.toString(),
                    title,
                    read: false,
                    delete: false,
                    detail: true
                }
                return UserMsg.update({ username }, { $push: { msgList: obj } }, { upsert: true }).exec();
            }))
        });
		Promise.all(tmp).then((res) => {
			console.log(res);
			console.log("推送完成");			
			process.exit();
		}).catch((err) => {
			console.error(err);
		})
    }
}
function createMessage(msg) {
    var s = new Msg(msg);
    return s.save();
}