<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
//距離計算
$AmbID = $_GET['AmbID'];
$Amb = $_conSQL->query("select top 1 lat,lng from AmbulanceInTimePoint where AmbulanceID='" . $AmbID . "' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
$theFisrt = $_conSQL->query("select I.InjuredPeopleID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.AmbulanceID='' and I.status='1' order by R.datetime ASC")->fetch(PDO::FETCH_ASSOC);
// print_r($theFisrt);
$Injureds = $_conSQL->query("select R.lat,R.lng,I.status,R.datetime,I.InjuredPeopleID,I.Name,I.sex,I.phone,I.contact,I.ContactPhone,R.injuredArea,R.injuredStatus,R.injuredCause,R.InjuryStateLog,R.toHospitalID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.status='1' and lat is not null")->fetchall(PDO::FETCH_ASSOC);
// $Injureds = $_conSQL->query("select R.lat,R.lng,I.status,R.datetime,I.InjuredPeopleID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.AmbulanceID is not null and I.status='1' and lat is not null order by datetime DESC")->fetchall(PDO::FETCH_ASSOC);

$ReTime = date("Y-m-d H:i:s", time());
$ReTurnJSON['Amb'] = $Amb;
$ReTurnJSON['injured'] = $Injureds[0];
$ReTurnJSON['time'] = $ReTime;

$Hospital = $_conSQL->query("select * from DBhospital where ID='" . $ReTurnJSON['injured']['toHospitalID'] . "'")->fetch(PDO::FETCH_ASSOC);
$ReTurnJSON['hospital'] = $Hospital;
$_conSQL->query("update InjuredPeople set AmbulanceID='" . $AmbID . "' where InjuredPeopleID='" . $ReTurnJSON['injured']['InjuredPeopleID'] . "'");
echo json_encode($ReTurnJSON, JSON_UNESCAPED_UNICODE);
?>