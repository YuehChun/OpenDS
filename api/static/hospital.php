<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$hospitals = $_conSQL->query("select ID,name,level,lat,lng from DBhospital where (lat is not null and lng is not null) and lat>'24.92' and lng<'121.67'")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($hospitals, JSON_UNESCAPED_UNICODE);
?>
