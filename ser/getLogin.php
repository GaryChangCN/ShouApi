<?php
include "conn.php";
$username = $_GET['username'];
$password = $_GET['password'];
$q1 = mysql_query("select count('username') from user where username='$username'");
$r1 = mysql_fetch_array($q1);
$data = array();
$cookie = dirname(__FILE__) . '/shouTemp.txt';
if ($r1[0] > 0) {
	$q2 = mysql_query("select name,username,password from user where username='$username'");
	$r2 = mysql_fetch_array($q2);
	if ($password == $r2[2]) {
		$data['data']['name'] = $r2[0];
		$data['data']['username'] = $r2[1];
		$data['data']['password'] = $r2[2];
		$data['state']="0";
	} else {
		$data['state'] = "1";
	}
} else {
	$putData=array("username"=>$username,"password"=>$password);
	$curl=curl_init();
	curl_setopt($curl, CURLOPT_URL, "http://202.121.64.37/User/login");//登录提交的地址 
    curl_setopt($curl, CURLOPT_HEADER, 0);//是否显示头信息 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//是否自动显示返回的信息 
    curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie); //设置Cookie信息保存在指定的文件中 
    curl_setopt($curl, CURLOPT_POST, 1);//post方式提交 
    curl_setopt($curl, CURLOPT_POSTFIELDS, $putData);//要提交的信息 
    $j1=curl_exec($curl);
	$a1=json_decode($j1,true);
	if($a1['Code']!="-1"){
		$data['data']['name'] = $a1['Data']['PsnName'];
		$data['data']['username'] = $a1['Data']['PsnAccount'];
		$data['data']['password'] = $password;
		$data['state']="0";
		$oname=$data['data']['name'];
		$ousername=$data['data']['username'];
		$omd5=$a1['Data']['MD5Code'];
		$odegree=$a1['Data']['PsnType'];
		$ocollege=$a1['Data']['PsnDept'];
		$otime=date("Y-m-d H:i:s");
		mysql_query("INSERT INTO user VALUES('','$oname','$ousername','$password','$omd5','$otime','$odegree','','$ocollege','','','')");
	}else{
		$data['state']="1";	
	}
}
@unlink($cookie);
mysql_close();
echo json_encode($data);
?>