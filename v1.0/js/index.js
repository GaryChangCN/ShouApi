(function() { //获取周数余额等
	var a = new Date();
	var jiange = a.getTime() - 1456070400000; //Date().parse("Feb 22 ,2016")
	var day = Math.floor(jiange / 1000 / 60 / 60 / 24 / 7) + 1;
	document.querySelector(".topBarRightSecond span:nth-child(2)").innerText = day + "周";
	if (!localStorage.balance) {
		$(".topBarRightFirst span:last-child").text("--");
	} else {
		$(".topBarRightFirst span:last-child").text(localStorage.balance);
	}
})();

function disableTouchmove() {
	$(document).on("touchmove", function(e) {
		event.preventDefault();
	}, false);
}

function enableTouchmove() {
	$(document).unbind("touchmove");
}
function isLocalStorageSupported() { //判断是否支持localstroge
	var testKey = 'test',
		storage = window.sessionStorage;
	try {
		storage.setItem(testKey, 'testValue');
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
}


function closeAlert() { //模拟弹出框--关闭
	$(".cover,.alert").hide();
	enableTouchmove();
	$(".alertTitle").text("");
	$(".alertContent").text("");
}

function openAlert(title, content) { //模拟弹出框--打开
	$(".cover,.alert").show();
	disableTouchmove()
	$(".alertTitle").html(title);
	$(".alertContent").html(content);
}

function windowHeight() { //设备窗口高度
	var windowHeight = window.innerHeight;
	if (typeof windowHeight != "number") {
		if (document.compatMode == "CSS1Compat") {
			windowHeight = document.documentElement.clientHeight;
		} else {
			windowHeight = document.body.clientHeight
		}
	}
	var height = windowHeight - 52;
	$(".index").css('height', height + 'px');
	$(".attention").css('height', height + 'px');
}

function startLoad(first, second, s1, s2) { //开启进度条
	$(".loadingBack").css('display', 'block');
	$(".loading").animate({
		width: first.toString()+ "%"
	}, s1 * 1000, function() {
		$(".loading").animate({
			width: second.toString() + "%"
		}, s2 * 1000)
	});
}

function endLoad() { //关闭进度条
	$(".loading").stop();
	$(".loading").css('width','10%');
	$(".loadingBack").css('display', 'none');
}
var page = new Array()
page.splice(0, page.length);
page[0] = "mainIndex";
page.back = function() { //返回按键
	var cengshu = page.length;
	var a = page[cengshu - 2];
	var b = page[cengshu - 1];
	page.pop();
	mainIndexAnimateShow(a, b)
}
page.url="http://192.168.1.115:8080/shoumedia";
function mainIndexAnimateHide(a, b) { //mainIndex切换动画（关闭）
	$(".topBar").animate({
		opacity: "0"
	}, 600);
	$("." + a).animate({
		marginRight: "100%"
	}, 500, function() {
		$(".mainIndex").css('display', 'none');
		$("." + b).css('display', 'block');
		if (a=="mainIndex") {
			$("#about").hide();
			$("#goBack").show();
		}
	})
}

function mainIndexAnimateShow(a, b) { //mainIndex切换动画 （打开）
	$("." + b).css('display', 'none');
	$("." + a).css('display', 'block');
	$("#goBack").hide();
	if (a=='mainIndex') {
		$("#about").show()
		$("#goBack").hide();
	} else{
	}
	$("." + a).animate({
		marginRight: "0%"
	}, 500);
	//$(".topBar").css('opacity', '1');
	$(".topBar").animate({
		opacity: "1"
	}, 600);
}

function informationShow() { //登录或退出后个人资料变化
	if (!localStorage.username||!localStorage.password) {
		$(".topBarLeftFirst img").show();
		$("canvas").remove();
		$("#login").text("登录").addClass("topBarLeftSecond");
	} else {
		$(".topBarLeftFirst img").hide();
		var icon = blockies.create({ // All options are optional
			seed: localStorage.username, // seed used to generate icon data, default: random
			color: 'rgb(199,205,208)', // to manually specify the icon color, default: random
			bgcolor: 'rgb(96,125,139)', // choose a different background color, default: white
			size: 10, // width/height of the icon in blocks, default: 10
			scale: 7 // width/height of each block in pixels, default: 5
		});
		$(".topBarLeftFirst").append(icon);
		$("#login").text(localStorage.name).removeClass("topBarLeftSecond");
	}
}
function iReload() {  //刷新随机时间戳
			var a = new Date();
			window.location.href = page.url + "/main.html?main=" + a.getTime();
		}