<?
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$AmbID= $_GET['AmbID'];
$Task = $_conSQL->query("select top 1 * from InjuredPeople where AmbulanceID order by InjuredPeopleID DESC")->fetch(PDO::FETCH_ASSOC);
echo json_encode($Position, JSON_UNESCAPED_UNICODE);
?>