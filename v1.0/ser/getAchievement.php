<?php
header('Access-Control-Allow-Origin:*');
header("content-type:text/html;charset=utf-8");
$username=$_GET['username'];
$password=$_GET['password'];
$data = array();
$cookie = dirname(__FILE__) . '/shouCardTemp.txt';
$url = "http://202.121.64.37/User/login";
$putData = array("username" => $username, "password" => $password);
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $putData);
$j1 = curl_exec($curl);
curl_close($curl);
$a1 = json_decode($j1, true);
function get_content($url2, $cookie) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url2);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);
	//读取cookie
	$j = curl_exec($ch);
	//执行cURL抓取页面内容
	curl_close($ch);
	return json_decode($j, true);
}

if ($a1['Code'] != "-1") {
	$omd5 = $a1['Data']['MD5Code'];
	$url2 = "http://202.121.64.37/student/?m=student.GetXQ&xh=" . $omd5;
	$a2 = get_content($url2, $cookie);
	$xq = $a2['Data'][0]['ZXJXJHH'];
	$url3 = "http://202.121.64.37/student/?m=student.GetScoreForMoblie&xh=" . $omd5 . "&xq=" . $xq;
	$a3 = get_content($url3, $cookie);
	$data['data'] = $a3['Data'];
	$data['state'] = "0";
} else {
	$data['state'] = "1";
}
echo json_encode($data);
@unlink($cookie);
?>