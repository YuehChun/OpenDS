<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
//距離計算
$AmbID = $_GET['AmbID'];
$Amb = $_conSQL->query("select top 1 lat,lng from AmbulanceInTimePoint where AmbulanceID='" . $AmbID . "' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
$Injureds = $_conSQL->query("select R.lat,R.lng,I.status,R.datetime,I.InjuredPeopleID from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.status='1' and lat is not null order by datetime DESC")->fetchall(PDO::FETCH_ASSOC);
$Hospital = $_conSQL->query("select * from DBhospital where ID='1'")->fetch(PDO::FETCH_ASSOC);
// $TInjureds['lat'] = 25.04596899999999;
// $TInjureds['lng'] = 121.51319599999999;
// $TInjureds['status'] = 1;
// $TInjureds['datetime'] = "2014-11-12 12:00:00";
// $TInjureds['InjuredPeopleID'] = 37;
$ReTime = date("Y-m-d H:i:s", time());
$ReTurnJSON['hospital'] = $Hospital;
$ReTurnJSON['Amb'] = $Amb;
$ReTurnJSON['injured'] = $Injureds[0];
$ReTurnJSON['time'] = $ReTime;

// $_conSQL->query("update InjuredPeople set AmbulanceID='" . $AmbID . "' where InjuredPeopleID='" . $TInjureds['InjuredPeopleID'] . "'");
echo json_encode($ReTurnJSON, JSON_UNESCAPED_UNICODE);
?>