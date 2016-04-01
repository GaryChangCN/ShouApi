(function() {
	endLoad();
	function getBalance() { //判断余额是否需要刷新 半小时自动刷新一次22点至5点不刷新
		if (!localStorage.balance) {
			information();
		} else {
			var b = new Date();
			bMin = b.getTime();
			if (localStorage.balanceHour > 22 || localStorage.balanceHour <= 5) {
				$(".cardDetail").html("姓名：" + localStorage.name + "<br/>卡号：" + localStorage.cardno + "<br/>余额：" + localStorage.balance);
			} else {
				if (bMin - localStorage.balanceTime > 1800000) {
					information();
				} else {
					$(".cardDetail").html("姓名：" + localStorage.name + "<br/>卡号：" + localStorage.cardno + "<br/>余额：" + localStorage.balance);
				}
			}
		}
	}
	getBalance();
	$(".cardUl li:nth-child(1)").click(function() {
		$(this).parent(".cardUl").children().removeClass("cardUlClass");
		$(this).addClass("cardUlClass");
		$(".cardCost,.cardAdd").hide();
		$(".cardDetail").show();
		getBalance();
	})
	$(".cardUl li:nth-child(2)").click(function() {
		$(this).parent(".cardUl").children().removeClass("cardUlClass");
		$(this).addClass("cardUlClass");
		$(".cardDetail,.cardAdd").hide();
		$(".cardCost").show();
		$(".cardCost button").nextAll().remove();
		$(".cardCost button").click(function() {
			var s = $("#costStart").val().split(/[-\/ :]/).join("");
			var e = $("#costEnd").val().split(/[-\/ :]/).join("");
			if (parseInt(e) - parseInt(s) >= 0) {
				$.ajax({
					type: "get",
					url: page.url + "/ser/getCard.php",
					async: true,
					beforeSend: function() {
						startLoad(80, 90, 1, 3);
					},
					dataType: "json",
					data: {
						"type": "2",
						"username": localStorage.username,
						"password": localStorage.password,
						"start": s,
						"end": e
					},
					success: function(data) {
						var jsonText = JSON.stringify(data);
						var getData = JSON.parse(jsonText);
						var temp = "";
						for (var i = 0; i < getData.data.length; i++) {
							temp += "<ul><li>消费金额：" + getData.data[i].amount + "</li><li>费后余额：" + getData.data[i].aftbala + "</li><li>费前余额：" + getData.data[i].befbala + "</li><li>消费地点：" + getData.data[i].position + "</li><li>消费类型：" + getData.data[i].type + "</li><li>消费时间：" + getData.data[i].transtime + "</li></ul>";
						}
						$(".cardCost").append(temp);
					},
					complete:function(){
						endLoad();
					}
				});
			} else {
				openAlert("提示", "结束日期必须大于等于开始日期！");
			}
		})
		$("#costEnd").keydown(function() {
			if (event.keyCode == 13) {
				$(".cardCost button").click();
			}
		})
	})
	$(".cardUl li:nth-child(3)").click(function() {
		$(this).parent(".cardUl").children().removeClass("cardUlClass");
		$(this).addClass("cardUlClass");
		$(".cardDetail,.cardCost").hide();
		$(".cardAdd").show();
		$(".cardAdd button").nextAll().remove();
		$(".cardAdd button").click(function() {
			var s = $("#addStart").val().split(/[-\/ :]/).join("");
			var e = $("#addEnd").val().split(/[-\/ :]/).join("");
			if (parseInt(e) - parseInt(s) >= 0) {
				$.ajax({
					type: "get",
					url: page.url + "/ser/getCard.php",
					async: true,
					beforeSend: function() {
						startLoad(85, 90, 1, 3);
					},
					dataType: "json",
					data: {
						"type": "3",
						"username": localStorage.username,
						"password": localStorage.password,
						"start": s,
						"end": e
					},
					success: function(data) {
						var jsonText = JSON.stringify(data);
						var getData = JSON.parse(jsonText);
						var temp = "";
						for (var i = 0; i < getData.data.length; i++) {
							temp += "<ul><li>充值金额：" + getData.data[i].amount + "</li><li>充后余额：" + getData.data[i].aftbala + "</li><li>充前余额：" + getData.data[i].befbala + "</li><li>充值地点：" + getData.data[i].position + "</li><li>充值类型：" + getData.data[i].type + "</li><li>充值时间：" + getData.data[i].transtime + "</li></ul>";
						}
						$(".cardAdd").append(temp);
					},
					complete: function() {
						endLoad();
					}
				});
			} else {
				openAlert("提示", "结束日期必须大于等于开始日期！");
			}
		})
		$("#AddEnd").keydown(function() {
			if (event.keyCode == 13) {
				$(".cardCost button").click();
			}
		})
	})
	function information() {
		$.ajax({
			type: "get",
			url: page.url + "/ser/getCard.php",
			async: true,
			beforeSend: function() {
				startLoad(80, 93, 0.5, 3);
			},
			dataType: "json",
			data: {
				"username": localStorage.username,
				"password": localStorage.password,
				"type": "1"
			},
			success: function(data) {
				var jsonText = JSON.stringify(data);
				var getData = JSON.parse(jsonText);
				if (getData.state == "0") {
					$(".topBarRightFirst span:last-child").text(getData.data.balance);
					$(".cardDetail").html("姓名：" + localStorage.name + "<br/>卡号：" + getData.data.cardno + "<br/>余额：" + getData.data.balance);
					localStorage.setItem("balance", getData.data.balance);
					localStorage.setItem("cardno", getData.data.cardno);
					var a = new Date();
					localStorage.setItem("balanceTime", a.getTime());
					localStorage.setItem("balanceHour", a.getHours());
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