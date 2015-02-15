<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$Diss = $_conSQL->query("select ID as DisID,lat,lng,datetime,status from MapDestruction where status='1'")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($Diss, JSON_UNESCAPED_UNICODE);
?>