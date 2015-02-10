<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$shelter = $_conSQL->query("select ID,name,lat,lng from DBshelters where (lat is not null and lng is not null) and lat>'24.92' and lng<'121.67'")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($shelter, JSON_UNESCAPED_UNICODE);

?>