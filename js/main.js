require.config({
	urlArgs:"beta=1.0.0",
	paths: {
		"card": "card",
		"achievement": "achievement",
		"address": "address",
		"GPA":  "GPA",
		"login":"login",
		"index": "index"
	}
})
require(["blockies", "index"], function() {
	if (!isLocalStorageSupported()) {
		$("body").children().remove();
	}
	informationShow();
	windowHeight();
	$(".cover").click(function() {
		closeAlert();
	})
	$(".ok").click(function() {
		var a = $(".alertContent").text();
		if (a.indexOf("确定要退出登录") >= 0) {
			localStorage.removeItem("name");
			localStorage.removeItem("password");
			localStorage.removeItem("username");
			localStorage.clear();
			iReload();
		} else {
			closeAlert();
		}
	})
	$("#goBack").click(function() {
		page.back();
	})
	$(".hearder span:last-child").click(function() { //刷新数据控制器
		var where = page[page.length - 1];
		switch (where) {
			case 'mainIndex':
				iReload();
				break;
			case 'cardIndex':
				localStorage.removeItem("balance");
				localStorage.removeItem("balanceHour");
				localStorage.removeItem("balanceTime");
				localStorage.removeItem("cardno");
				iReload();
				break;
			case 'achievementIndex':
				localStorage.removeItem("achievementHour");
				localStorage.removeItem("achievementJSON");
				localStorage.removeItem("achievementTime");
				iReload();
			case 'pointIndex':
				localStorage.removeItem("achievementHour");
				localStorage.removeItem("achievementJSON");
				localStorage.removeItem("achievementTime");
				iReload();
				break;
			default:
				iReload();
				break;
		}
	})
	$("canvas").click(function() {
		openAlert("头像", "这里是您的专属头像，由学号加姓名随机生成，目前不支持更改")
	})
	$(".topBarLeftSecond").click(function() { //点击登录
		page.push("loginIndex");
		startLoad(40, 80, 1, 2);
		$("body").scrollTop(0);
		disableTouchmove();
		mainIndexAnimateHide('mainIndex', 'loginIndex');
		require(['login'], function() {
			endLoad()
		});
	})
	$("#logOut").click(function() {
		if (localStorage.username) {
			openAlert("提示", "确定要退出登录？")
		} else {
			openAlert("提示", "请先登录！");
		}
	})
	$(".card").click(function() {
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			page.push("cardIndex");
			startLoad(30, 95, 1, 3);
			$("body").scrollTop(0);
			mainIndexAnimateHide('mainIndex', 'cardIndex');
			require(['card'], function() {
				endLoad();
			})
		}
	})
	$(".achievement").click(function() {
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			page.push("achievementIndex");
			startLoad(30, 85, 1, 2);
			$("body").scrollTop(0);
			mainIndexAnimateHide('mainIndex', 'achievementIndex');
			require(['achievement'], function() {
				endLoad();
			})
		}
	})
	$(".address").click(function() {
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			page.push("addressIndex");
			startLoad(30, 85, 1, 2);
			$("body").scrollTop(0);
			mainIndexAnimateHide('mainIndex', 'addressIndex');
			require(['address'], function() {
				endLoad();
			})
		}
	})
	$(".point").click(function() {
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			page.push("pointIndex");
			startLoad(30, 85, 1, 2);
			$("body").scrollTop(0);
			mainIndexAnimateHide('mainIndex', 'pointIndex');
			require(['GPA'], function() {
				endLoad();
			})
		}
	})
	$(".xxzc").click(function(){
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			openAlert("提示","因为目前只能查询信息学院形势政策，所以该功能升级中！");
		}
	})
	$(".missing").click(function(){
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			openAlert("提示","测试版本，功能开发中。");
		}
	})
	$(".love").click(function(){
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			openAlert("提示","测试版本，功能开发中。");
		}
	})
	$(".car").click(function(){
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			openAlert("提示","测试版本，功能开发中。");
		}
	})
	$(".help").click(function(){
		if ((!localStorage.username) || (!localStorage.password)) {
			openAlert("提示", "请先登录")
			informationShow();
		} else {
			openAlert("提示","测试版本，功能开发中。");
		}
	})
})