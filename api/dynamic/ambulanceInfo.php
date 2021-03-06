<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$AmbID = $_GET['AmbID'];
// echo $AmbID
// $AllTask = $_conSQL->query("select I.sex,I.AmbulanceID,I.Contact,I.ContactPhone,R.* from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID order by InjuredPeopleID DESC")->fetchall(PDO::FETCH_ASSOC);
// print_r($AllTask);
$ATask = $_conSQL->query("select I.sex,I.name,I.Contact,I.ContactPhone,I.InjuredPeopleID,I.status,R.toHospitalID,R.inAmbulanceTime from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where AmbulanceID='" . $AmbID . "' order by InjuredPeopleID DESC")->fetch(PDO::FETCH_ASSOC);
if (is_null($ATask['InjuredPeopleID'])) {
	$ATask['H']['name'] = "--";
	$ATask['H']['level'] = "";
	$ATask['sex'] = "--";
	$ATask['name'] = "--";
	$ATask['Contact'] = "--";
	$ATask['ContactPhone'] = "--";
	$ATask['S'] = "等待傷患";
} else {
	$ATask['H'] = $_conSQL->query("select name,level from DBhospital where ID ='" . $ATask['toHospitalID'] . "'")->fetch(PDO::FETCH_ASSOC);
	$ATask['sex'] = is_null($ATask['sex']) ? "未知" : ($ATask['sex'] == 1) ? "男" : "女";
	$ATask['name'] = $ATask['name'] == "" ? "未知" : $ATask['name'];
	$ATask['Contact'] = $ATask['Contact'] == "" ? "未知" : $ATask['Contact'];
	$ATask['ContactPhone'] = $ATask['ContactPhone'] == "" ? "未知" : $ATask['ContactPhone'];
	if ($ATask['status'] == "2") {
		$ATask['S'] = '前往醫院途中';
	} else {
		$ATask['S'] = '前往傷患點途中';
	}
}
$ATask['ambID'] = $AmbID;
$ATask['uptime'] = date("Y-m-d H:i:s", time());
echo json_encode($ATask, JSON_UNESCAPED_UNICODE);
?>