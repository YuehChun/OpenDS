<?
//把這個改成跟person一樣
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";
//index when make marker
$Days = is_null($_GET['Days'])?1:$_GET['Days'];
$Ambs = $_conSQL->query("select AmbulanceID as AmbID,lng,lat,convert(VARCHAR(24),datetime, 20) as time from AmbulanceInTimePoint where pointID in (select max(pointID) as pointID from AmbulanceInTimePoint where datetime > '" . date("Y-m-d H:i:s", time() - (86400 * $Days)) . "' group by AmbulanceID)")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($Ambs, JSON_UNESCAPED_UNICODE);
exit();
/*
//敘述在後面到時候在加

$ReAmbs=[];
$_conSQL->query("update InjuredPeople set AmbulanceID='10',status='1' where InjuredPeopleID=45");

foreach($Ambs as $Key => $Value){

	$AmbInfo = $_conSQL->query("select AmbulanceID,lng,lat from AmbulanceInTimePoint where AmbulanceID = '".$Value['AmbulanceID']."' order by datetime DESC")->fetch(PDO::FETCH_ASSOC);
	$TaskInfo = $_conSQL->query("select I.InjuredPeopleID,I.status,R.InAmbulanceTime,R.toHospitalID,R.lat,R.lng from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where I.AmbulanceID = '".$Value['AmbulanceID']."'")->fetch(PDO::FETCH_ASSOC);
	$AmbID = $AmbInfo['AmbulanceID'];
	switch($TaskInfo['status']){
		case "1":
			$status = "Go To Injured Point(".$TaskInfo['lat'].",".$TaskInfo['lng'].")!";
			break;
		case "2":
			$Hospital = $_conSQL->query("select name from DBhospital where ID='".$TaskInfo['toHospitalID']."'")->fetch(PDO::FETCH_ASSOC);
			$status = "Go To Hospital(".$Hospital['name'].")!";
			break;
		case "3":
			//$Arrive = $_conSQL->query("select toHospitalTime from MedicalReturnLog where InjuredPeopleID='".$TaskInfo['InjuredPeopleID']."'")->fetch(PDO::FETCH_ASSOC);
			$Arrive="2014-01-01 12:00:00";
			$status = "Arrive to Hospital!! Time: ".$Arrive;
			break;
		case "4":
			$status = "Don't go to Hospital!! Time: ".$TaskInfo['InAmbulanceTime'];
			break;

		default:
			$status = "Error!";
	}
	$ReAmbs[$AmbID]['Injured']['status'] = $status;
	$ReAmbs[$AmbID]['Injured']['lat'] = $TaskInfo['lat'];
	$ReAmbs[$AmbID]['Injured']['lng'] = $TaskInfo['lng'];
	$ReAmbs[$AmbID]['Injured']['time'] = date("Y-m-d H:i:s" , time());
}
echo json_encode($ReAmbs, JSON_UNESCAPED_UNICODE);
*/
?>