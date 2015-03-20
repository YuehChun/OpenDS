<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
//距離計算
$AmbID = $_GET['AmbID'];
$Amb = $_conSQL->query("select top 1 lat,lng,AmbulanceID as AmbID,IP from AmbulanceInTimePoint where AmbulanceID='" . $AmbID . "' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
$lastJob = $_conSQL->query("select InjuredPeopleID from InjuredPeople where AmbulanceID='" . $AmbID . "' and (status ='1' or status='2')")->fetchall(PDO::FETCH_ASSOC);
if (is_null($lastJob[0])) {
	$theFisrt = $_conSQL->query("update InjuredPeople set AmbulanceID='" . $AmbID . "',status='1' OUTPUT INSERTED.InjuredPeopleID where InjuredPeopleID in (select top 1 I.InjuredPeopleID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.AmbulanceID='' and I.status='1' and R.lat is not null order by R.datetime ASC)")->fetch(PDO::FETCH_ASSOC);
	if (is_null($theFisrt['InjuredPeopleID'])) {
		$TempInjID = "Wait";
	} else {
		$TempInjID = $theFisrt['InjuredPeopleID'];
	}
} else {
	$TempInjID = $lastJob[0]['InjuredPeopleID'];
}

// 可適用
if ($TempInjID == "Wait") {
	$ReTurnJSON['injured'] = "Wait";
	$ReTurnJSON['hospital'] = "Wait";
} else {
	$ReTurnJSON['injured'] = $_conSQL->query("select R.lat,R.lng,I.status,R.datetime,I.InjuredPeopleID,I.Name,I.sex,I.phone,I.contact,I.ContactPhone,R.injuredArea,R.injuredStatus,R.injuredCause,R.InjuryStateLog,R.toHospitalID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.InjuredPeopleID='" . $TempInjID . "'")->fetch(PDO::FETCH_ASSOC);
	$Hospital = $_conSQL->query("select * from DBhospital where ID='" . $ReTurnJSON['injured']['toHospitalID'] . "'")->fetch(PDO::FETCH_ASSOC);
	$ReTurnJSON['hospital'] = $Hospital;
}
$ReTime = date("Y-m-d H:i:s", time());
$ReTurnJSON['Amb'] = $Amb;
$ReTurnJSON['time'] = $ReTime;
echo json_encode($ReTurnJSON, JSON_UNESCAPED_UNICODE);
?>