<?php
	include "xszcconn.php";
	//$id=$_GET['id'];
	$id=1357222;
	$query=mysql_query("SELECT pass FROM xxzc2 WHERE ID='$id'");
	$row=mysql_fetch_array($query);
	$data=array("pass"=>$row[0]);
	echo json_encode($data);
	mysql_close();
	?>