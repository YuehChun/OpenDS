<?
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$Days = is_null($_GET['Days'])?1:$_GET['Days'];
$injs = $_conSQL->query("select InjuredPeopleID as InjID,lat,lng,datetime from InjuredReturnLog where inAmbulanceTime is null")->fetchall(PDO::FETCH_ASSOC);
$injPeople = [];
foreach($injs as $Key => $Value){
	$IPID = $Value['InjID'];
	$injPeople[$IPID]=$Value;
}
echo json_encode($injPeople, JSON_UNESCAPED_UNICODE);

?>