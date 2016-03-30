<?php
include "conn.php";
$teacher=$_GET['teacherName'];
$teacherName = "%".$teacher."%";
$data = array();
$q0 = mysql_query("SELECT count(id) FROM address WHERE name LIKE '$teacherName'");
$r0 = mysql_fetch_array($q0);
if ($r0[0] <= 0) {
	$data['state'] = "1";
} else {
	$data['state'] = "0";
	$q1 = mysql_query("SELECT * FROM address WHERE name LIKE '$teacherName'");
	$i = 0;
	while ($r1 = mysql_fetch_array($q1)) {
		$data['data'][$i] = array("name" => $r1[1], "work" => $r1[2], "phonenumber" => $r1[3], "number" => $r1[4], "email" => $r1[5]);
		$i++;
	}
}
echo json_encode($data);
?>