<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['PerID']) {
	$tIP = $_GET['IP'];
	$lat = $_GET['lat'];
	$lng = $_GET['lng'];
	$userID = $_GET['PerID'];
	$RoadStatus = is_null($_POST['RoadStatus']) ? "" : $_POST['RoadStatus'];
	$Scope = is_null($_POST['Scope']) ? "" : $_POST['Scope'];
	$CarPass = is_null($_POST['CarPass']) ? "0" : $_POST['CarPass'];
	$DisNote = is_null($_POST['DisStatus']) ? "" : $_POST['DisStatus'];
	$InsertTime = date("Y-m-d H:i:s", time());
	$DisasterSQL = "insert into MapDestruction (IP,lat,lng,UserID,datetime,status,scope,carPassThrough,note,RoadStatus) OUTPUT INSERTED.ID values ('" . $tIP . "','" . $lat . "','" . $lng . "','" . $userID . "','" . $InsertTime . "','1','" . $Scope . "','" . $CarPass . "','" . $DisNote . "','" . $RoadStatus . "')";
	$Disaster = $_conSQL->query($DisasterSQL)->fetch(PDO::FETCH_ASSOC);

	$Log['DisID'] = $Disaster['ID'];
	$Log['time'] = $InsertTime;
	echo json_encode($Log, JSON_UNESCAPED_UNICODE);
} else {
	echo "error";
	exit();
}

?>