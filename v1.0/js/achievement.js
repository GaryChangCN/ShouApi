(function() {
	endLoad();
	$(".achievementIndex").children().remove();
	if (localStorage.achievementJSON) {
		var b = new Date();
		bMin = b.getTime();
		if (localStorage.achievementHour > 22 || localStorage.achievementHour <= 5) {
			locationJSON();
		} else if (bMin - localStorage.achievementTime > 1800000) {
			getAchievementJSON();
		} else {
			locationJSON();
		}
	} else {
		getAchievementJSON();
	}

	function locationJSON() {
		var temp = "";
		var localAchievement = JSON.parse(localStorage.achievementJSON);
		for (var i = 0; i < localAchievement.data.length; i++) {
			temp += "<ul><li>" + localAchievement.data[i].KCM + "<li></li><li>课程号：" + localAchievement.data[i].KCH + "</li><li>课序号：" + localAchievement.data[i].KXH + "</li><li>成绩：" + localAchievement.data[i].KCCJ + "</li><li>学分：" + localAchievement.data[i].XF + "</li></ul>";
		}
		$(".achievementIndex").append(temp);
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
					var temp = "";
					for (var i = 0; i < getData.data.length; i++) {
						temp += "<ul><li>" + getData.data[i].KCM + "<li></li><li>课程号：" + getData.data[i].KCH + "</li><li>课序号：" + getData.data[i].KXH + "</li><li>成绩：" + getData.data[i].KCCJ + "</li><li>学分：" + getData.data[i].XF + "</li></ul>";
					}
					$(".achievementIndex").append(temp);
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

})();