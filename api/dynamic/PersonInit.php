<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

if ($_GET['IP']) {
	$tIP = $_GET['IP'];
	$PerID = $_conSQL->query("select TOP 1 ID from UserLog where IP='" . $tIP . "' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
	// print_r($PerID);
	if ($PerID['ID']) {
		echo json_encode($PerID, JSON_UNESCAPED_UNICODE);
	} else {
		$InsertString = "insert into UserLog (IP,datetime,name,phone) OUTPUT INSERTED.ID values ('" . $tIP . "','" . date("Y-m-d H:i:s", time()) . "','test','123')";
		$ReturnID = $_conSQL->query($InsertString)->fetch(PDO::FETCH_ASSOC);
		echo json_encode($ReturnID, JSON_UNESCAPED_UNICODE);
	}
}
?>