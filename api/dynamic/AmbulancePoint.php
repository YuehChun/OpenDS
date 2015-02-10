<?
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if (preg_match('/^\d+$/', $_GET['AmbID'])) {
	$AmbID = intval($_GET['AmbID']);
	$AmbIP = $_GET['IP'];
	$Amblat = $_GET['lat'];
	$Amblng = $_GET['lng'];
	$AmbUpTime = date("Y-m-d H:i:s", time());
	$InsertSQL = "insert into AmbulanceInTimePoint (AmbulanceID,lat,lng,datetime,IP) values ('" . $AmbID . "','" . $Amblat . "','" . $Amblng . "','" . $AmbUpTime . "','" . $AmbIP . "');";

	if ($_conSQL->query($InsertSQL)) {
		// $ReInfo['lat'] = $Amblat;
		// $ReInfo['lng'] = $Amblng;
		$ReInfo['time'] = $AmbUpTime;
		echo json_encode($ReInfo, JSON_UNESCAPED_UNICODE);
	} else {
		echo "ERROR";
	}
} else {
	echo "error";
	exit();
}

?>