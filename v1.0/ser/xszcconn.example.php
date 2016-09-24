<?php
	$dbhostname='';//数据库地址
	$dbusername='';//用户名
	$dbpassword='';//密码
	$link=mysql_connect($dbhostname,$dbusername,$dbpassword);
	if($link){
		//echo "ok";
	}else{
		die('error'.mysql_error());
	}
	header('Access-Control-Allow-Origin:*');
    header("content-type:text/html;charset=utf-8");
    mysql_select_db("", $link);//数据库名
	?>