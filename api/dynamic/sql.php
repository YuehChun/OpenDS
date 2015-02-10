<?
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";


$AAA = $_conSQL->query("select * from DBpolice")->fetchall(POD::FETCH_ASSOC);
print_r($AAA);


?>