<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
if ($_GET['IP']) {
	$TIP = $_GET['IP'];
	//檢查是否為完成上次任務
	$PerID = $_conSQL->query("select TOP 1 * from Ambulance where IP='" . $TIP . "' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
	if (is_null($PerID['AmbulanceID'])) {
		$InsertString = "insert into Ambulance (IP,datetime,status) OUTPUT INSERTED.AmbulanceID values ('" . $TIP . "','" . date("Y-m-d H:i:s", time()) . "','1')";
		$ReturnID = $_conSQL->query($InsertString)->fetch(PDO::FETCH_ASSOC);
	} else {
		if (strtotime($PerID['datetime']) >= (time() - 86400)) {
			$ReturnID['AmbulanceID'] = $PerID['AmbulanceID'];
		} else {
			$InsertString = "insert into Ambulance (IP,datetime,status) OUTPUT INSERTED.AmbulanceID values ('" . $TIP . "','" . date("Y-m-d H:i:s", time()) . "','1')";
			$ReturnID = $_conSQL->query($InsertString)->fetch(PDO::FETCH_ASSOC);
		}
	}
	echo json_encode($ReturnID, JSON_UNESCAPED_UNICODE);
}
?>