(function(){
	$(".pointIndex span:eq(1)").click(function() { //个人绩点查看
	$(".pointIndex span").css('color','rgb(199,205,208)');
	$(this).css('color','white');
	$(".pointIndexContainer li:first-child").text("个人一览");
	checkLocalStroage();
})
$(".pointIndex span:eq(0)").click(function() { //绩点计算器
	$(".pointIndex span").css('color','rgb(199,205,208)');
	$(this).css('color','white');
	$(".pointIndexContainer").hide();
	$(".GPAfigure").show();
	$(".personal").nextAll().remove();
	$(".pointIndexContainer li:first-child").text("计算结果");
})
$(".GPAfigure ul li:nth-child(1)").click(function() { //增加一行
	var temp = "<tr><td><input type='text'/></td><td><input type='text'/></td></tr>";
	$(".GPAfigure table").append(temp);
})
$(".GPAfigure ul li:nth-child(2)").click(function() { //删除一行
	if ($(".GPAfigure table tr").length > 1) {
		$(".GPAfigure table tr:last-child").remove();
	} else {
		openAlert("提示", "都删完了你还想干嘛？");
	}
})
$(".GPAfigure ul li:nth-child(3)").click(function() { //计算
	if ($(".GPAfigure table tr").length <= 1) {
		openAlert("提示", "请先输入成绩和学分");
	} else {
		forEachTr();
	}
})

function forEachTr() {
	var temp = new Object();
	temp.state = "0";
	temp.data = new Array();
	var length = $(".GPAfigure table tr").length;
	var exp = /^\d+$/;
	var tmp = function() {
		var a = "t";
		for (var i = 1; i < length; i++) {
			var CJ = $(".GPAfigure table tr:eq(" + i + ") td:first-child input").val();
			var XF = $(".GPAfigure table tr:eq(" + i + ") td:last-child input").val();
			if ((CJ == "") || (CJ == " ")) {
				a = "f"
			} else if (exp.test(XF)) {
				a = "t";
			} else {
				a = "f"
			}
		}
		return a;
	}
	if (tmp() == "t") {
		for (var i = 1; i < length; i++) {
			var CJ = $(".GPAfigure table tr:eq(" + i + ") td:first-child input").val();
			var XF = $(".GPAfigure table tr:eq(" + i + ") td:last-child input").val();
			var a = new Object();
			a.KCM = "第" + i + "科";
			a.XF = XF;
			a.KCCJ = CJ;
			temp.data.push(a);
		}
		console.log(JSON.stringify(temp));
		figureGPA(JSON.stringify(temp));
	}else{
		openAlert("提示", "请检查课程成绩是否为空或者学分是否不为数字");
	}
}

function checkLocalStroage() {
	if (localStorage.achievementJSON) {
		var b = new Date();
		bMin = b.getTime();
		if (localStorage.achievementHour > 22 || localStorage.achievementHour <= 5) {
			figureGPA(localStorage.achievementJSON);
		} else if (bMin - localStorage.achievementTime > 1800000) {
			getAchievementJSON();
		} else {
			figureGPA(localStorage.achievementJSON);
		}
	} else {
		getAchievementJSON();
	}
}

function getAchievementJSON() {
	$.ajax({
		type: "get",
		url: page.url + "/ser/getAchievement.php",
		async: true,
		beforeSend: function() {
			startLoad(60, 80, 0.6, 4);
		},
		dataType: "json",
		data: {
			"username": localStorage.username,
			"password": localStorage.password
		},
		success: function(data) {
			var jsonText = JSON.stringify(data);
			var getData = JSON.parse(jsonText);
			if (getData.state == "0") {
				localStorage.setItem("achievementJSON", jsonText);
				var a = new Date();
				localStorage.setItem("achievementTime", a.getTime());
				localStorage.setItem("achievementHour", a.getHours());
				figureGPA(localStorage.achievementJSON);
			} else if (getData.state == "1") {
				openAlert("提示", "请先登录！");
			} else {
				openAlert("警告", "出现错误，错误代码：" + getData.state);
			}
		},
		complete: function() {
			endLoad();
		}
	});
}

function figureGPA(where) {
	$(".GPAfigure").hide();
	$(".pointIndexContainer").show();
	var getData = JSON.parse(where);
	var temp = new String();
	var zongxuefenjidian = new Number(); //总学分绩点
	var zongxuefen = new Number(); //总学分
	var zongjidian = new Number(); //总绩点
	var zongchengji = new Number(); //总成绩
	for (var i = 0; i < getData.data.length; i++) {
		var jidian = new Number(); //绩点
		var tmp = "<ul>";
		var KCCJ = parseFloat(getData.data[i].KCCJ);
		tmp += "<li>" + getData.data[i].KCM + "</li><li></li><li>分数：" + getData.data[i].KCCJ + "</li><li>学分：" + getData.data[i].XF + "</li>";
		if (isNaN(KCCJ)) {
			if (getData.data[i].KCCJ == "优秀") {
				KCCJ=99;
				jidian = 4.0;
			} else if (getData.data[i].KCCJ == "良好") {
				KCCJ=83;
				jidian = 3.3;
			} else if (getData.data[i].KCCJ == "中等") {
				KCCJ=73;
				jidian = 2.3;
			} else if (getData.data[i].KCCJ == "及格") {
				KCCJ=62;
				jidian = 1.0
			} else if (getData.data[i].KCCJ == "不及格") {
				KCCJ=50;
				jidian = 0;
			} else if (getData.data[i].KCCJ == "通过") {
				KCCJ=83;
				jidian = 3.3;
			} else if(getData.data[i].KCCJ=="不通过"){
				KCCJ=50;
				jidan=0;
			}else{
				jidian = 0;
				KCCJ = 60;		
			}
		} else {
			if (KCCJ >= 90) {
				jidian = 4.0;
			} else if (KCCJ >= 85) {
				jidian = 3.7;
			} else if (KCCJ >= 82) {
				jidian = 3.3;
			} else if (KCCJ >= 78) {
				jidian = 3.0;
			} else if (KCCJ >= 75) {
				jidian = 2.7;
			} else if (KCCJ >= 72) {
				jidian = 2.3;
			} else if (KCCJ >= 68) {
				jidian = 2.0
			} else if (KCCJ >= 66) {
				jidian = 1.7;
			} else if (KCCJ >= 64) {
				jidian = 1.5
			} else if (KCCJ >= 60) {
				jidian = 1.0
			} else {
				jidian = 0
			}
		}
		zongchengji += KCCJ;
		zongjidian += jidian;
		var xuefen = parseFloat(getData.data[i].XF);
		//		console.log("学分");
		//		console.log(xuefen);
		//		console.log("绩点");
		//		console.log(jidian);
		var xuefenjidian = parseFloat((xuefen * jidian).toFixed(2)); //学分绩点
		//		console.log("学分绩点");
		//		console.log(xuefenjidian);
		zongxuefenjidian += xuefenjidian; //总学分绩点
		zongxuefen += xuefen; //总学分
		//		console.log("总成绩");
		//		console.log(zongchengji);
		//		console.log("总学分");
		//		console.log(zongxuefen);
		//		console.log("总绩点");
		//		console.log(zongjidian);
		//		console.log("总学分绩点");
		//		console.log(zongxuefenjidian);
		tmp += "<li>绩点：" + jidian.toString() + "</li><li>学分绩点：" + xuefenjidian.toString() + "</li></ul>";
		temp += tmp;
	}
	$(".personal").nextAll().remove();
	$(".pointIndexContainer").append(temp);
	$(".personal li:nth-child(5)").text("平均绩点：" + (zongjidian / getData.data.length).toFixed(2));
	$(".personal li:nth-child(4)").text("平均学分绩点：" + (zongxuefenjidian / zongxuefen).toFixed(2));
	$(".personal li:nth-child(3)").text("平均分:" + (zongchengji / getData.data.length).toFixed(2));
}
})();
