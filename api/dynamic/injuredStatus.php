<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$InjGroupID = $_GET['InjGroupID'];
$InjArray = split(",", $_GET['InjGroupID']);
$InSql = "";
for ($i = 1; $i < count($InjArray); $i++) {
	if ($i > 1) {
		$InSql .= ",";
	}
	$InSql .= "'" . $InjArray[$i] . "'";
}
// $InjuredInfos = $_conSQL->query("select InjuredPeopleID as InjID FROM InjuredPeople WHERE InjuredPeopleID in (" . $InSql . ") and not status='1'")->fetchall(PDO::FETCH_ASSOC);
$injPeople = [];
$newInjs = $_conSQL->query("select R.InjuredPeopleID as InjID,R.lat,R.lng,R.datetime,I.name as IName,I.sex,I.Contact,I.status,R.injuredArea,R.injuredStatus,R.injuredCause from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where R.inAmbulanceTime is null and I.status ='1'")->fetchall(PDO::FETCH_ASSOC);
foreach ($newInjs as $Key => $Value) {

	$Area = $Value['injuredArea'];
	$Area = str_replace("0", "頭", $Area);
	$Area = str_replace("1", "手", $Area);
	$Area = str_replace("2", "腳", $Area);
	$Area = str_replace("3", "胸", $Area);
	$Value['injuredArea'] = $Area;

	$Status = $Value['injuredStatus'];
	$Status = str_replace("0", "骨折", $Status);
	$Status = str_replace("1", "出血嚴重", $Status);
	$Status = str_replace("2", "燒燙傷", $Status);
	$Status = str_replace("3", "凍傷", $Status);
	$Status = str_replace("4", "化學傷", $Status);
	$Status = str_replace("5", "切割傷", $Status);
	$Status = str_replace("6", "撕裂傷", $Status);
	$Status = str_replace("7", "穿刺傷", $Status);
	$Status = str_replace("8", "斷裂傷", $Status);
	$Status = str_replace("9", "挫傷", $Status);
	$Value['injuredStatus'] = $Status;

	$Cause = $Value['injuredCause'];
	$Cause = str_replace("0", "車禍", $Cause);
	$Cause = str_replace("1", "氣爆", $Cause);
	$Cause = str_replace("2", "溺水", $Cause);
	$Cause = str_replace("3", "跌倒", $Cause);
	$Value['injuredCause'] = $Cause;

	$IPID = $Value['InjID'];
	$Value['sex'] = is_null($Value['sex']) ? "未知" : ($Value['sex'] == 1) ? "男" : "女";
	$Value['IName'] = $Value['IName'] == "" ? "未知" : $Value['IName'];
	$Value['Contact'] = $Value['Contact'] == "" ? "未知" : $Value['Contact'];
	$Value['datetime'] = substr($Value['datetime'], 0, -4);

	$injPeople[$IPID] = $Value;
}

// $ReturnInfo['Clear'] = $InjuredInfos;
$ReturnInfo['New'] = $injPeople;
$ReturnInfo['uptime'] = date("Y-m-d H:i:s", time());
echo json_encode($ReturnInfo, JSON_UNESCAPED_UNICODE);
?>