<?php
header('Access-Control-Allow-Origin:*');
header("content-type:text/html;charset=utf-8");
$username = $_GET['username'];
$password = $_GET['password'];
$type = $_GET['type'];
$data = array();
$cookie = dirname(__FILE__) . '/shouCardTemp.txt';
function login_post($url, $cookie, $putdata) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $putdata);
	$j1 = curl_exec($curl);
	curl_close($curl);
	return json_decode($j1, true);
}

function get_content($url, $cookie) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);
	//读取cookie
	$j2 = curl_exec($ch);
	//执行cURL抓取页面内容
	curl_close($ch);
	return json_decode($j2, true);
}

switch ($type) {
	case '1' :
		$url1 = 'http://202.121.64.37/User/login';
		$putData = array("username" => $username, "password" => $password);
		$a1 = login_post($url1, $cookie, $putData);
		if ($a1['Code'] != "-1") {
			$omd5 = $a1['Data']['MD5Code'];
			$url2 = 'http://202.121.64.37/yktapi/?m=yktapi.Querycust&stuempno=' . $omd5;
			$a2 = get_content($url2, $cookie);
			$data['data']['balance'] = $a2['data']['balance'];
			$data['data']['cardno'] = $a2['data']['cardno'];
			$data['state'] = "0";
		} else {
			$data['state'] = "1";
		}
		echo json_encode($data);
		break;
	case '2' :
		$url1 = 'http://202.121.64.37/User/login';
		$putData = array("username" => $username, "password" => $password);
		$a1 = login_post($url1, $cookie, $putData);
		if ($a1['Code'] != "-1") {
			$omd5 = $a1['Data']['MD5Code'];
			$start = $_GET['start'];
			$end = $_GET['end'];
			$url2 = "http://202.121.64.37/yktapi/?m=yktapi.getxf&stuempno=" . $omd5 . "&startdate=" . $start . "&enddate=" . $end;
			$a2 = get_content($url2, $cookie);
			$data['data'] = $a2['data'];
			$data['state'] = "0";
		} else {
			$data['State'] = "1";
		}
		echo json_encode($data);
		break;
	case '3' :
		$url1 = 'http://202.121.64.37/User/login';
		$putData = array("username" => $username, "password" => $password);
		$a1 = login_post($url1, $cookie, $putData);
		if ($a1['Code'] != "-1") {
			$omd5 = $a1['Data']['MD5Code'];
			$start = $_GET['start'];
			$end = $_GET['end'];
			$url2 = "http://202.121.64.37/yktapi/?m=yktapi.getcz&stuempno=" . $omd5 . "&startdate=" . $start . "&enddate=" . $end;
			$a2 = get_content($url2, $cookie);
			$data['data'] = $a2['data'];
			$data['state'] = "0";
		} else {
			$data['State'] = "1";
		}
		echo json_encode($data);
		break;
	default :
		$data['state'] = "3";
		echo json_encode($data);
		break;
}
@unlink($cookie); 
?>