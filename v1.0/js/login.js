(function() {
	endLoad();
	$("#username").keyup(function(event) {
		if($(this).val().length==7){
			$("#password").focus();
		}
	});
	$("#loginSubmit").click(function() {
		var exp = /^\d+$/g;
		if ($("#username").val() == "" || $("#password").val() == "") {
			openAlert("提示", "用户名和密码不为空！");
		} else if (exp.test($("#username").val())) {
			$.ajax({
				type: "get",
				url: page.url + "/ser/getLogin.php",
				async: true,
				beforeSend: function() {
					startLoad(60, 90, 0.3, 3);
				},
				dataType: "json",
				data: {
					"username": $("#username").val(),
					"password": $("#password").val()
				},
				success: function(data) {
					var jsonText = JSON.stringify(data);
					var getData = JSON.parse(jsonText);
					if (getData.state == 0) {
						localStorage.setItem("username", getData.data.username);
						localStorage.setItem("password", getData.data.password);
						localStorage.setItem("name", getData.data.name);
						informationShow();
						page.back();
						enableTouchmove();
					} else if (getData.state == 1) {
						openAlert("提示", "学号或密码不正确");
					} else {
						openAlert("错误", "登录错误，错误代码：" + getData.state);
					}
				},
				complete: function() {
					endLoad();
				}
			});
		} else {
			openAlert("提示", "学号应该是数字！");
		}
	})
	$("#password").keydown(function() {
		if (event.keyCode == 13) {
			$("#loginSubmit").click();
		} else {

		}
	})
})();