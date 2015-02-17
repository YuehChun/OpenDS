<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['PerID']) {
	$tIP = $_GET['IP'];
	$lat = $_GET['lat'];
	$lng = $_GET['lng'];
	$userID = $_GET['PerID'];
	$Items = is_null($_POST['Items']) ? "" : $_POST['Items'];
	$PersonNumber = is_null($_POST['PersonNumber']) ? "1" : $_POST['PersonNumber'];
	$note = is_null($_POST['note']) ? "" : $_POST['note'];
	$InsertTime = date("Y-m-d H:i:s", time());
	$SuppliesSQL = "insert into SuppliesPoint (IP,lat,lng,UserID,datetime,status,personNum,supNeed,note) OUTPUT INSERTED.pointID values ('" . $tIP . "','" . $lat . "','" . $lng . "','" . $userID . "','" . $InsertTime . "','1','" . $PersonNumber . "','" . $Items . "','" . $note . "');";
	$tempID = $_conSQL->query($SuppliesSQL)->fetch(PDO::FETCH_ASSOC);
	$LogSQL = "select pointID as SupID,datetime as time from SuppliesPoint where pointID='" . $tempID['pointID'] . "'";
	$Log = $_conSQL->query($LogSQL)->fetch(PDO::FETCH_ASSOC);

	echo json_encode($Log, JSON_UNESCAPED_UNICODE);
} else {
	echo "error";
	exit();
}

?>