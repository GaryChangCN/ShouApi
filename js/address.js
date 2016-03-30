(function() {
	endLoad();
	$(".addressIndex span").nextAll().remove();
	$(".addressIndex input").keydown(function() {
		if (event.keyCode == "13") {
			$(".addressIndex span").click()
		}
	})
	$(".addressIndex span").click(function() {
		$(".addressIndex span").nextAll().remove();
		var teacherName = $(".addressIndex input").val();
		if (!$(".addressIndex input").val()) {
			openAlert("提示", "请输入教职工姓名！");
		} else {
			$.ajax({
				type: "get",
				url: page.url + "/ser/getAddress.php",
				async: true,
				beforeSend: function() {
					startLoad(60, 90, 1, 3);
				},
				dataType: "json",
				data: {
					"teacherName": teacherName
				},
				success: function(data) {
					var jsonText = JSON.stringify(data);
					var getData = JSON.parse(jsonText);
					if (getData.state == "0") {
						var temp = "";
						for (var i = 0; i < getData.data.length; i++) {
							temp+="<ul><li>"+getData.data[i].name+"</li><li></li><li>地点："+getData.data[i].work+"</li><li>手机号："+getData.data[i].phonenumber+"</li><li>编号："+getData.data[i].number+"</li><li>"+getData.data[i].email+"</li></ul>";
						}
						$(".addressIndex").append(temp);
					} else {
						openAlert("提示", "找不到该教工联系方式")
					}
				},
				complete: function() {
					endLoad()
				}
			});
		}
	})
})();