<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');

$_conSQL->query()->fetchall(PDO::FETCH_ASSOC);
?>