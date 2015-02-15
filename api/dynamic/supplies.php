<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$Diss = $_conSQL->query("select pointID as SupID,lat,lng,datetime,status from SuppliesPoint where status='1'")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($Diss, JSON_UNESCAPED_UNICODE);
?>