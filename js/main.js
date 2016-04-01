require.config({
//	shim: {
//		blockies: {
//			exports: 'blockies'
//		},
//		index: {
//			exports: 'index'
//		},
//		achievementGPA: {
//			exports: 'achievementGPA'
//		},
//		address: {
//			exports: 'address'
//		},
//		card: {
//			exports: 'card'
//		},
//		login:{
//			expotrs:'login'
//		}
//	}
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
	$(".ok").click(function(){
		var a=$(".alertContent").text();
		if (a.indexOf("确定要退出登录")>=0) {
			localStorage.removeItem("name");
			localStorage.removeItem("password");
			localStorage.removeItem("username");
			localStorage.clear();
			location.reload(true);
		} else{
			closeAlert();
		}
	})
	$("#goBack").click(function() {
		page.back();
	})
	$(".hearder span:last-child").click(function() {
		window.location.reload(true);
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
	$("#logOut").click(function(){
		if (localStorage.username) {
			openAlert("提示","确定要退出登录？")
		} else{
			openAlert("提示","请先登录！");
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
	$(".point").click(function(){
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
})