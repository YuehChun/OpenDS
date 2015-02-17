<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$SupGroupID = $_GET['SupGroupID'];
$SupArray = split(",", $_GET['SupGroupID']);
$InSql = "";
for ($i = 1; $i < count($SupArray); $i++) {
	if ($i > 1) {
		$InSql .= ",";
	}
	$InSql .= "'" . $SupArray[$i] . "'";
}

// $ClearInfos = $_conSQL->query("select pointID as SupID FROM SuppliesPoint WHERE pointID in (" . $InSql . ") and not status='1'")->fetchall(PDO::FETCH_ASSOC);
$SQLSup = $_conSQL->query("select pointID as SupID,lat,lng,datetime,status,personNum,supNeed,note from SuppliesPoint where status ='1'")->fetchall(PDO::FETCH_ASSOC);
$CurSup = "";
foreach ($SQLSup as $Key => $Value) {
	$TempKey = $Value['SupID'];
	switch ($Value['personNum']) {
		case '1':$CurSup[$TempKey]['theNumber'] = "1 ~ 3";
			break;
		case '2':$CurSup[$TempKey]['theNumber'] = "3 ~ 10";
			break;
		case '3':$CurSup[$TempKey]['theNumber'] = "10 ~ 20";
			break;
		case '4':$CurSup[$TempKey]['theNumber'] = "20 ~ 50";
			break;
		case '5':$CurSup[$TempKey]['theNumber'] = "50 ~ 10";
			break;
		default:
			$CurSup[$TempKey]['theNumber'] = "none";
	}
	$Items = $Value['supNeed'];
	$Items = str_replace("0", "礦泉水", $Items);
	$Items = str_replace("1", "泡麵", $Items);
	$Items = str_replace("2", "乾糧", $Items);
	$Items = str_replace("3", "瓦斯罐", $Items);
	$Items = str_replace("4", "電池", $Items);
	$CurSup[$TempKey]['Items'] = substr($Items, 0, -1);
	$CurSup[$TempKey]['lat'] = $Value['lat'];
	$CurSup[$TempKey]['lng'] = $Value['lng'];
	$CurSup[$TempKey]['time'] = $Value['datetime'];
	$CurSup[$TempKey]['status'] = $Value['status'];
	$CurSup[$TempKey]['note'] = $Value['note'];
	$CurSup[$TempKey]['SupID'] = $Value['SupID'];
}
// $ReturnInfo['Clear'] = $ClearInfos;
$ReturnInfo['Current'] = $CurSup;
$ReturnInfo['uptime'] = date("Y-m-d H:i:s", time());
echo json_encode($ReturnInfo, JSON_UNESCAPED_UNICODE);
?>