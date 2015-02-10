<?
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";



if (preg_match('/^\d+$/', $_GET['PerID'])) {
	$PerID = intval($_GET['PerID']);
	$PerIP = $_GET['IP'];
	$Perlat = $_GET['lat'];
	$Perlng = $_GET['lng'];
	$PerUpTime = date("Y-m-d H:i:s", time());
	$InsertSQL = "insert into UserInTimePoint (UserID,lat,lng,datetime,IP) values ('" . $PerID . "','" . $Perlat . "','" . $Perlng . "','" . $PerUpTime . "','" . $PerIP . "');";
	if ($_conSQL->query($InsertSQL)) {
		// $ReInfo['lat'] = $Amblat;
		// $ReInfo['lng'] = $Amblng;
		$ReInfo['time'] = $PerUpTime;
		echo json_encode($ReInfo, JSON_UNESCAPED_UNICODE);
	} else {
		echo "ERROR";
	}
} else {
	echo "error";
	exit();
}

?>