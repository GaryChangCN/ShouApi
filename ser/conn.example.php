<?php
$dbhostname1 = '';//数据库地址
$dbuser1 = '';//用户名
$dbpassword1 = '';//密码
$dbname='';//数据库名字
//连接数据库
$link = new mysqli($dbhostname1, $dbuser1, $dbpassword1,$dbname);
if (!$link) {
	//echo "ok";
	die('err' . mysql_error());
}
header('Access-Control-Allow-Origin:*');
header("content-type:text/html;charset=utf-8");
?>