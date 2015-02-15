<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['PerID']) {
	$tIP = $_GET['IP'];
	$lat = $_GET['lat'];
	$lng = $_GET['lng'];
	$userID = $_GET['PerID'];
	$InsertTime = date("Y-m-d H:i:s", time());
	$SuppliesSQL = "insert into SuppliesPoint (IP,lat,lng,UserID,datetime,status) OUTPUT INSERTED.pointID values ('" . $tIP . "','" . $lat . "','" . $lng . "','" . $userID . "','" . $InsertTime . "','1');";
	$Supplies = $_conSQL->query($SuppliesSQL)->fetch(PDO::FETCH_ASSOC);
	$Log['SupID'] = $Supplies['pointID'];
	$Log['time'] = $InsertTime;
	echo json_encode($Log, JSON_UNESCAPED_UNICODE);
} else {
	echo "error";
	exit();
}

?>