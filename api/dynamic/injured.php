<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$Days = is_null($_GET['Days']) ? 1 : $_GET['Days'];
$injs = $_conSQL->query("select R.InjuredPeopleID as InjID,R.lat,R.lng,R.datetime,I.name as IName,I.sex,I.Contact,I.status from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where R.inAmbulanceTime is null and I.status ='1'")->fetchall(PDO::FETCH_ASSOC);
$injPeople = [];
foreach ($injs as $Key => $Value) {
	$IPID = $Value['InjID'];
	$Value['sex'] = is_null($Value['sex']) ? "未知" : ($Value['sex'] == 1) ? "男" : "女";
	$Value['IName'] = $Value['IName'] == "" ? "未知" : $Value['IName'];
	$Value['Contact'] = $Value['Contact'] == "" ? "未知" : $Value['Contact'];
	$Value['datetime'] = substr($Value['datetime'], 0, -4);
	$injPeople[$IPID] = $Value;
}
echo json_encode($injPeople, JSON_UNESCAPED_UNICODE);
?>