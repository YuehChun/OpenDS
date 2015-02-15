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
$SupInfos = $_conSQL->query("select InjuredPeopleID as InjID FROM InjuredPeople WHERE InjuredPeopleID in (" . $InSql . ") and not status='1'")->fetchall(PDO::FETCH_ASSOC);
$newInjs = $_conSQL->query("select R.InjuredPeopleID as InjID,R.lat,R.lng,R.datetime,I.name as IName,I.sex,I.Contact,I.status from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where R.inAmbulanceTime is null and I.status ='1' and R.InjuredPeopleID not in (" . $InSql . ")")->fetchall(PDO::FETCH_ASSOC);
foreach ($newInjs as $Key => $Value) {
	$IPID = $Value['InjID'];
	$Value['sex'] = is_null($Value['sex']) ? "未知" : ($Value['sex'] == 1) ? "男" : "女";
	$Value['IName'] = $Value['IName'] == "" ? "未知" : $Value['IName'];
	$Value['Contact'] = $Value['Contact'] == "" ? "未知" : $Value['Contact'];
	$Value['datetime'] = substr($Value['datetime'], 0, -4);
	$injPeople[$IPID] = $Value;
}

$ReturnInfo['Clear'] = $InjuredInfos;
$ReturnInfo['New'] = $injPeople;
$ReturnInfo['uptime'] = date("Y-m-d H:i:s", time());
echo json_encode($ReturnInfo, JSON_UNESCAPED_UNICODE);
?>