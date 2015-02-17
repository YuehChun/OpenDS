<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$DisGroupID = $_GET['DisGroupID'];
$DisArray = split(",", $_GET['DisGroupID']);
$InSql = "";
for ($i = 1; $i < count($DisArray); $i++) {
	if ($i > 1) {
		$InSql .= ",";
	}
	$InSql .= "'" . $DisArray[$i] . "'";
}

// $ClearInfos = $_conSQL->query("select ID as DisID FROM MapDestruction WHERE ID in (" . $InSql . ") and not status='1'")->fetchall(PDO::FETCH_ASSOC);
$SQLDis = $_conSQL->query("select ID as DisID,lat,lng,datetime,status,scope,RoadStatus,note,carPassThrough from MapDestruction where status ='1'")->fetchall(PDO::FETCH_ASSOC);
$CurDis = "";
foreach ($SQLDis as $Key => $Value) {
	$TempKey = $Value['DisID'];
	switch ($Value['scope']) {
		case '1':$CurDis[$TempKey]['Rank'] = "1 ~ 3";
			break;
		case '2':$CurDis[$TempKey]['Rank'] = "3 ~ 10";
			break;
		case '3':$CurDis[$TempKey]['Rank'] = "10 ~ 20";
			break;
		case '4':$CurDis[$TempKey]['Rank'] = "20 ~ 50";
			break;
		case '5':$CurDis[$TempKey]['Rank'] = "50 ~ 10";
			break;
		default:
			$CurDis[$TempKey]['Rank'] = "none";
	}
	$Road = $Value['RoadStatus'];
	$Road = str_replace("0", "樹倒塌", $Road);
	$Road = str_replace("1", "道路阻塞", $Road);
	$Road = str_replace("2", "地層下陷", $Road);
	$Road = str_replace("3", "房屋倒塌", $Road);
	$CurDis[$TempKey]['eventStatus'] = substr($Road, 0, -1);
	$CurDis[$TempKey]['lat'] = $Value['lat'];
	$CurDis[$TempKey]['lng'] = $Value['lng'];
	$CurDis[$TempKey]['time'] = $Value['datetime'];
	$CurDis[$TempKey]['status'] = $Value['status'];
	$CurDis[$TempKey]['note'] = $Value['note'];
	$CurDis[$TempKey]['Pass'] = $Value['carPassThrough'] == 1 ? "是" : "否";
	$CurDis[$TempKey]['DisID'] = $Value['DisID'];
}
// $ReturnInfo['Clear'] = $ClearInfos;
$ReturnInfo['Current'] = $CurDis;
$ReturnInfo['uptime'] = date("Y-m-d H:i:s", time());
echo json_encode($ReturnInfo, JSON_UNESCAPED_UNICODE);
?>